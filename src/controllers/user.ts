import express from "express";
import { v4 as uuid } from "uuid";
import { User, Session } from "../db";
import { JWT, BCrypt } from "../helpers";
import { CustomError } from "../custom";

export class UserController {
 static async create(req: express.Request, res: express.Response) {
  try {
   const user = (await User.create(req.body)).toJSON() as any;

   const response = {
    email: user.email,
    id: user.id,
    token: JWT.sign({
     ...user,
     sessionId: uuid()
    })
   };

   res.status(201).json({
    statusCode: 201,
    response
   });
  } catch (error) {
   res.status(500).json({
    statusCode: 500,
    response: error.message
   });
  }
 }

 static async login(req: express.Request, res: express.Response) {
  try {
   const { email, password } = req.body;
   const user = (await User.findByEmail(email)) as any;

   if (!user)
    throw new CustomError(404, `User with email ${email} not found`);
   
   if (!BCrypt.comparePw(password, user.password))
    throw new CustomError(400, "Password not correct");

   const response = {
    email: user.email,
    id: user.id,
    token: JWT.sign({
     ...user,
     sessionId: uuid()
    })
   };

   res.status(200).json({
    statusCode: 200,
    response
   });
  } catch (error) {
   res.status(error.c || 500).json({
    statusCode: error.c || 500,
    response: error.message
   });
  }
 }

 static async logout(req: express.Request & { payload: any; sessionId: string; }, res: express.Response) {
  try {
   const { payload, sessionId } = req;
   const session = (await Session.invalidate(sessionId)).toJSON();
   const response = {
    session,
    message: `Successfully signed out user ${payload.email}` 
   };

   res.status(200).json({
    statusCode: 200,
    response
   });
  } catch (error) {
   res.status(500).json({
    statusCode: 500,
    response: error.message
   });
  }
 }

 static async authenticate(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const { email, id, sessionId } = req.payload;
   res.status(200).json({
    statusCode: 200,
    response: { email, id, sessionId }
   });
  } catch (error) {
   res.status(500).json({
    statusCode: 500,
    response: error.message
   });
  }
 } 
}
