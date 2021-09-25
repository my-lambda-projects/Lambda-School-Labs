import { getAllSurveys, getSurvey } from '../models/surveys';
import { Request, Response, NextFunction } from 'express';
import { RequestMock, ResponseMock } from '../../__tests__/helpers';
import { QueryBuilder } from 'knex';

type NextFunctionMock = (a: any) => any;
type Requests = Request | RequestMock;
type Responses = Response | ResponseMock;
type Nexts = NextFunction | NextFunctionMock;
let get: (req: Request, res: Response, next: NextFunction) => Promise<void>;

// interface Surveys{
//   get()
// }

get = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const survey: QueryBuilder = await getSurvey(id);
      res.status(200).json(survey);
    } catch (e) {
      e.statusCode = e.statusCode || 400;
      next(e);
    }
  } else {
    try {
      const surveys: QueryBuilder = await getAllSurveys(id);
      res.status(200).json(surveys);
    } catch (e) {
      e.statusCode = e.statusCode || 400;
      next(e);
    }
  }
};

export { get };
