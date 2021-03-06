import express from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Session, User } from "../db";
import { CustomError } from "../custom";
import { JWT, Validators } from "../helpers";

export const checkToken = async (req: express.Request & { payload: any; sessionId: string; }, res: express.Response, next: express.NextFunction) => {
 try {
  const { authorization } = req.headers;

  if(!authorization)
   throw new CustomError(401, "Authorization header not present in request");

  if (!authorization.startsWith("Bearer"))
   throw new CustomError(401, "Authorization must be of type \"Bearer\"");
  
  const token = authorization.substring(7, authorization.length);

  if (!token || token.trim().length === 0)
   throw new CustomError(401, "Token not present in authorization header");

  let payload: any = null;

  try {
   payload = JWT.decode(token);
  } catch (error) {
   if (error instanceof TokenExpiredError)
    throw new CustomError(401, "Token expired. Sign in again.");
   
   if (error instanceof JsonWebTokenError)
    throw new CustomError(401, "Token error. Sign in again");

   throw new CustomError(401, error.message);
  }

  if (await Session.isInvalid(payload.sessionId))
   throw new CustomError(401, "Invalid session. Sign in again");

  req.payload = payload;
  req.sessionId = payload.sessionId;
  next();
 } catch (error) {
  res.status(error.c || 500).json({
   statusCode: error.c || 500,
   response: error.message
  });
 }
};

export const emailInUse = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
 try {
  const { email } = req.body;
  const isRegistered = await User.findByEmail(email);
  
  if (isRegistered)
   throw new CustomError(400, `User with email ${email} already registered`);

  next();
 } catch (error) {
  res.status(error.c || 500).json({
   statusCode: error.c || 500,
   response: error.message
  });
 }
};

export const keysArePresent = (keys: Array<string>) => {
 return (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
   const { body } = req;
   if (!Validators.keysPresent(body, keys))
    throw new CustomError(
     400, 
     `${
      Validators.errorMessages(body, keys)
      .join("\n")
      .replace("email", "Email")
      .replace("password", "Password")
     }`
    );

   next();
  } catch (error) {
   res.status(error.c || 500).json({
    statusCode: error.c || 500,
    response: error.message
   });
  }
 };
}
