import { getSurveyByStayId, postStaysSurveys, updateById } from '../models/staysSurveys';
// Type Definitions
import { Request, Response, NextFunction } from 'express';
import { RequestMock, ResponseMock } from '../../__tests__/helpers';
import { findStayByAstId } from '../models/stays/stays'
import db from '../../data/dbConfig';
import { QueryBuilder } from 'knex';
import { Stay } from '../interface';
import { postItemsStay } from '../models/items';


type NextFunctionMock = (a: any) => any;

type Requests = Request | RequestMock;
type Responses = Response | ResponseMock;
type Nexts = NextFunction | NextFunctionMock;

export const post = async (req: Request, res: Response, next: Nexts) => {
  const { stayId, surveyId } = req.body;
  console.log(req.body)
  if (stayId && surveyId) {
    try {
      const survey = await postStaysSurveys(req.body);
      res.status(200).json(survey);
    } catch (e) {
      e.statusCode = e.statusCode || 400;
      next(e);
    }
  } else {
    req.body.forEach(async (item: any) => {
      await postStaysSurveys(item);
    })
  }
};

export const put = async (req: Requests, res: Responses, next: Nexts) => { 
  const {id} = req.params;
  const validsurvey = await db('stayssurveys').where({id:id});
    if (validsurvey.length === 0) {
      throw Error('Not a valid List ID');
    }else{
      try{
        const update = await updateById(id)
        res.status(200).json(update);
      }catch(e){
        e.statusCode = e.statusCode || 400;
        next(e);
      }
      
    }

};

// let get: (res: Responses, req: Requests, next: Nexts) => Promise<void>;

export const get = async (req: Requests, res: Responses, next: Nexts) => {
  const { stayId } = req.body;
  try {
    const survey = await getSurveyByStayId(stayId);
    res.status(200).json(survey);
  } catch (e) {
    e.statusCode = e.statusCode || 400;
    next(e);
  }
}

export const getAststay = async (req: Requests, res: Responses, next: Nexts) => {
  const { id } = req.params;
  try {
    const stays = await findStayByAstId(id);
    res.status(200).json(stays)
  } catch (e) {
    e.statusCode = e.statusCode || 400;
    next(e);
  }
}
