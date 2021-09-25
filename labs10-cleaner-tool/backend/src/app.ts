import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import setGeneralMiddleware from './middleware/generalMiddleware';
import { findStaySummaryStandardizedByGuestId } from './models/stays/stays'
// @ts-ignore
import companion from '@uppy/companion';
import verifyToken from './middleware/verifyToken';
import * as users from './controller/users';
import * as guests from './controller/guests';
import * as houses from './controller/houses';
import * as lists from './controller/lists';
import * as items from './controller/items';
import * as email from './controller/email';
import * as payments from './controller/payments';
import * as stays from './controller/stays';
import * as connect from './controller/connect';
import * as assistants from './controller/assistants';
import * as staysSurveys from './controller/staysSurveys';
import path from 'path';

import {
  getAllSurveys,
  getSurveyResponse,
  getQuestionsAnswers,
  getSurveyResponsesById,
} from './models/surveys';

import db from '../data/dbConfig';

export const server = express();
setGeneralMiddleware(server);

server.use(express.static(path.resolve(path.join(__dirname, '../public'))));
server.get('/', (__, res) => res.sendFile('index.html'));

// Survey List in Balsamiq

server.get('/surveys/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await db('surveys').where({ user_id: id });
    res.json(data);
  } catch (e) {
    res.json(e);
  }
});
server.get('/surveysquestions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await db('surveys')
      .where({ id })
      .first();
    if (survey) {
      const questions = await db('questions').where({ survey_id: id });
      res.json({ survey, questions });
    }
  } catch (e) {
    res.json(e)
  }
});

server.get('/questionanswers', async (req, res) => {
  try {
    const data = await db('questionAnswers');
    res.json(data);
  } catch (e) {
    res.json(e);
  }
});

server
  .route('/stays/surveys/:id')
  .put(staysSurveys.put);
  
// Authentication Middleware for *all* routes after this line

server.get('/data', async (req, res) => {
  try {
    const usersData = await db('user');
    res.json(usersData);
  } catch (e) {
    res.json(e);
  }
});


server.get('/surveyresponses/:id', verifyToken, async (req, res) => {
  const response = await getSurveyResponsesById(req.params.id)
  res.status(200).json(response)
});
// Questions Route
server.get('/questions', async (req, res) => {
  try {
    const data = await db('questions');
    res.json(data);
  } catch (e) {
    res.json(e);
  }
});

// Not needed but works
server.get('/questionanswers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const questionAnswers = await getQuestionsAnswers(id);
    res.json({ questionAnswers });
  } catch (e) {
    res.json(e);
  }
});
server.put('/surveys/:id', async (req, res) => {
  const id = req.params.id
  const survey = await db('surveys').where({ id: id })
  const responses = survey[0].responses
  const update = await db('surveys').where({ id: id }).update({ responses: responses + 1 })
  try {
    res.status(200).json(responses + 1)
  } catch (e) {
    res.json(e)
  }
});
/* for Guest dashboard Info*/
server.route('/gueststay/:id').get(stays.getGuest);

server.get('/stay/surveys/:id', async (req, res) => {
  
  try{
    const id = req.params.id
    const stay = await db('stay').where({ guest_id: id });
    const houseId = stay[0].house_id
    const house = await db('house').where({ id: houseId })
    const managerId = house[0].manager
    const manager = await db('manager').where({ id: managerId })
    const userId = manager[0].user_id
    const surveys = await db('surveys').where({ user_id: userId })
    const surveyExtended: any = []
    for (let i = 0; i < surveys.length; i++) {
      let currentSurvey;
      currentSurvey = surveys[i]
      let current;
      current = await db('stayssurveys').where({ survey_id: currentSurvey.id })
      let status;
      status = current[0].is_complete
      surveyExtended.push({ ...currentSurvey, is_complete: status, stay_surveys_id: current[0].id})
    }
    res.json(surveyExtended)
  }
  catch(e){
    res.json(e)
  }
})

server
  .route('/users')
  .get(verifyToken, users.get)
  .post(users.post)
  .put(verifyToken, users.putByExtId);

// Authentication Middleware for *all* routes after this line
server.use(verifyToken);
// server
//   .route('/users')
//   .get(verifyToken, users.get)
//   .post(users.post)
//   .put(verifyToken, users.putByExtId);

server.get('/surveys', verifyToken, async (req, res) => {
  const id = req.token.id;
  try {
    const data = await db('surveys').where({ user_id: id });
    res.json(data);
  } catch (e) {
    res.json(e);
  }
});

server.post('/questionanswers/', verifyToken, async (req, res) => {
  const body = req.body
  const findQuestion = await db('questionAnswers').where({ question_id: body.question_id, stay_id: body.stay_id })
  if(findQuestion.length > 0){
    return res.status(400).json({errorMessage: 'survey already submitted'})
  }
  try {
    const data = await db('questionAnswers').insert(body)

    const response = await db('questionAnswers').where({ id: data[0] })
    res.json(response)
  } catch (e) { res.json(e) }
})

server.post('/surveys', verifyToken, async (req, res) => {
  const token = req.token
  const body = req.body

  try {
    const createSurvey = await db('surveys').insert({ ...body, responses: 0, user_id: token.id })
    const surveys = await db('surveys').where({ user_id: req.token.id })
    console.log(surveys)
    const surveyLocation = surveys.length - 1
    const surveyId = surveys[surveyLocation]
    res.status(201).json({ ...surveyId, message: 'successfully created survey' })
  } catch (e) {
    res.json(e)
  }
});

server.delete('/surveys/:id', async (req, res) => {
  try {
    const surveyId = req.params;
    const deleteSurvey = await db('surveys').where(surveyId).del()
    res.status(202).json({ message: "survey deleted" })
  } catch (e) {
    res.json(e.message)
  }
});

server.post('/questions', verifyToken, async (req, res) => {
  const body = req.body;
  
  try {
    const createQuestion = await db('questions').insert({ ...body });
    res.status(201).json(createQuestion);
  } catch (e) {
    res.json(e);
  }
  
});
//stays surveys
server
  .route('/stays/surveys')
  .get(staysSurveys.get)
  .post(staysSurveys.post)
  


server
  .route('/users/:id')
  .get(users.get)
  .put(users.put)
  .delete(users.deleteU);

server.route('/guests').post(guests.post);

server.route('/guests/:id').put(guests.put);
server
  .route('/houses')
  .get(houses.get)
  .post(houses.post);

server
  .route('/houses/:id')
  .get(houses.get)
  .put(houses.put)
  .delete(houses.deleteU);

server
  .route('/payments')
  .get(payments.get)
  .post(payments.post);

server
  .route('/connect')
  .post(verifyToken, connect.post)
  .delete(verifyToken, connect.deleteL);

server.route('/connect/createpayment').post(connect.createPayment);

server.route('/lists').post(lists.post);
/* this get route looks for a query. if `lists/1?stay=true`
the id should be for a stay. Anything else the id should be for a house
*/
server
  .route('/lists/:id')
  .get(lists.get)
  .delete(lists.deleteL);

server
  .route('/items')
  .get(items.get)
  .post(items.post);
server
  .route('/items/:id')
  .get(items.get)
  .put(items.put)
  .delete(items.deleteL);

server.route('/assistants').get(assistants.get);

server
  .route('/assistants/:id')
  .get(assistants.getId)
  .post(assistants.postAst)
  .delete(assistants.delAst);

server.route('/itemComplete').post(items.itemComplete);

server.route('/email').post(verifyToken, email.send);

server
  .route('/stays')
  .get(stays.getAll)
  .post(stays.post);

server
  .route('/stay/ast/:id')
  .get(staysSurveys.getAststay);

server
  .route('/stays/:id')
  .get(stays.get)
  .put(stays.put);

const options = {
  filePath: '../uploads',
  providerOptions: {
    s3: {
      bucket: 'cleaner-pos',
      key: process.env.AWS_Key,
      region: process.env.REGION,
      secret: process.env.AWS_SECRET,
    },
  },
  server: {
    host: 'localhost:3020',
    protocol: 'http',
  },
};
server.use(companion.app(options));

server.use(errorHandler);

export default server;
