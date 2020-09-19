import express from "express";
import { User } from "../db";
import { JWT } from "../helpers";

export class UserController {
 static async create(req: express.Request, res: express.Response) {
  try {
   const user = (await User.create(req.body)).toJSON() as any;

   const response = {
    email: user.email,
    id: user.id,
    token: JWT.sign(user)
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
  try {} catch (error) {}
 }
}
