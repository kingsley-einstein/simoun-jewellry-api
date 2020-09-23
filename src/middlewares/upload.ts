import express from "express";
import { CustomError } from "../custom";

export const upload = (req: express.Request & { fileObject: any }, res: express.Response, next:express.NextFunction) => {
 try {
  const { file } = req;
  
  if (!file)
   throw new CustomError(400, "File not found.");
  
  req.fileObject = {
   price: req.body.price,
   mimetype: file.mimetype,
   name: req.body.productName,
   bytes64: Buffer.from(file.buffer).toString("base64")
  };
  next();
 } catch (error) {
  res.status(error.c || 500).json({
   statusCode: error.c || 500,
   response: error.message
  });
 }
}
