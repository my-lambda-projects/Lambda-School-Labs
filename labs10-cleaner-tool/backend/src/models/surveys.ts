import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';
import { findAllHousesByManagerId } from './houses';

interface Surveys {
  id: number;
  name: string;
  isGuest: boolean;
}

let getSurvey: (id: string) => QueryBuilder;
// let getAllSurveys: () => QueryBuilder;
let getSurveyQuestions: (id: string) => QueryBuilder;
let getSurveyResponse: (id: number) => QueryBuilder;
let getQuestionsAnswers: (id: number) => QueryBuilder;
// Boy this one was a bit of a stretch
let filterByField: (
  field: string,
  fieldValue: string,
) => (query: QueryBuilder) => QueryBuilder;
let getSurveyByHouse: (id: string) => QueryBuilder;

/* Don't know why but I had to protect this in a function before it would work
  right otherwise it was returning a different sql statement every run */

const baseQuery = () => db('surveys');

filterByField = (field, fieldValue) => {
  return (query) => {
    return query.where(field, '=', fieldValue);
  };
};

const getAllSurveys = async (managerId: number) => {
  const houses = await findAllHousesByManagerId(managerId);
  for (let i = 0; i < houses.length; i++) {
    const surveys = await db('surveys').where('house_id', houses[i].id);
    houses[i].surveys = surveys;
  }
  let surveys = houses.map((house: any) => {
    return house.surveys;
  });
  surveys = surveys.flat();
  return surveys;
};

getSurvey = (id) => {
  const filteredById = filterByField('id', id);
  return filteredById(baseQuery());
};


getSurveyByHouse = (id) => {
  const filteredByHouseId = filterByField('house_id', id);
  return filteredByHouseId(baseQuery());
};

getSurveyQuestions = (id) => {
  return baseQuery()
    .join('questions', 'questions.survey_id', '=', 'surveys.id')
    .select(
      'surveys.name',
      'question.name',
      'surveys.isGuest',
      'question.isGuest',
    )
    .where({ survey_id: id });
};

getQuestionsAnswers = (id) => {
  return db('questions')
    .join('questionAnswers', 'questionAnswers.question_id', '=', 'questions.id')
    .select('questions.question', 'questionAnswers.answer')
    .where({ question_id: id });
};

getSurveyResponse = (id) => {
  return baseQuery()
    .join('questions', 'questions.survey_id', '=', 'surveys.id')
    .join('questionAnswers', 'questionAnswers.question_id', '=', 'questions.id')
    .select(
      'surveys.id as survey_id',
      'surveys.name',
      'surveys.isGuest',
      'questionAnswers.guest_name',
      'questionAnswers.photo',
      'questionAnswers.house_name',
      'questions.id as question_id',
      'questions.question',
      'questionAnswers.answer',
      'questionAnswers.answer_type',
      'questionAnswers.created_at'
    )
    .where({ survey_id: id, question_id: id });
};

const getSurveyResponsesById = async(id: any)=>{
  const survey = await db('surveys').where({id: id})
  const name = survey[0];
  const questions = await db('questions').where({survey_id: id})
  let questionIdArr = [];
  for(let i = 0; i<questions.length; i++){
    let question = questions[i].id
    questionIdArr.push(question)

  }
  let questionAnswers:any = []
  for(let i=0; i< questionIdArr.length; i++){
    let questionId = questionIdArr[i]
    let current = await db('questionAnswers').where({question_id: questionId })
    questionAnswers.push(...current)
  }
 let stayIdArr = []
  for(let i=0; i<questionAnswers.length; i++){
    let stayId = questionAnswers[i]
    let bool = stayIdArr.includes(stayId.stay_id);
    if(bool === false){
      stayIdArr.push(stayId.stay_id);
    }
  }
  let questionAnswersByStay: any = []
  for (let i = 0; i < stayIdArr.length; i++) {
    let stayId = stayIdArr[i]
    let current = await db('questionAnswers').join('questions', 'questions.id', '=', 'questionAnswers.question_id').where({ stay_id: stayId, survey_id: id })
    
    let first = current[0]
    let response = {
      survey_id: id,
      survey_name: name.name,
      stay_id: first.stay_id,
      guest_name: first.guest_name,
      house_name: first.house_name,
      photo: first.photo, 
      created_at: first.created_at,
      results: [
      ]
    }
    for (let j = 0; j < current.length; j++) {
      let index = current[j]
      let question = await db('questions').where({id: index.question_id})
      let questionIndex = question[0]
      let body:any = {answer: index.answer, answer_type: index.answer_type, question_id: index.question_id, question: questionIndex.question }
      let myResponse = response
      //@ts-ignore
       myResponse.results.push(body)
    }
   questionAnswersByStay.push(response)
  }
  const surveyObj = {survey: questionAnswersByStay}
  return surveyObj
}
export {
  getSurvey,
  getAllSurveys,
  getSurveyQuestions,
  getSurveyResponse,
  getQuestionsAnswers,
  getSurveyResponsesById,
};
