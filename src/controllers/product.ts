import express from "express";
import { Product } from "../db";
import { CustomError } from "../custom";

export class ProductController {
 static async create(req: express.Request & { fileObject: any; }, res: express.Response) {
  try {
   const response = (await Product.create(req.fileObject)).toJSON();
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

 static async findById(req: express.Request, res: express.Response) {
  try {
   const p = await Product.findById(req.params.id);

   if (!p)
    throw new CustomError(404, "Product not found");

   res.status(200).json({
    statusCode: 200,
    response: p.toJSON()
   });
  } catch (error) {
   res.status(error.c || 500).json({
    statusCode: error.c || 500,
    response: error.message
   });
  }
 }

 static async findByUploader(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const arr = await Product.findByUploader(req.payload.id);
   const response = arr.map((m) => m.toJSON());
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

 static async updateProduct(req: express.Request & { payload: any; fileObject: any; }, res: express.Response) {
  try {
   const arr = await Product.findByUploader(req.payload.id);
   const p = (arr.find((m: any) => m.id === req.params.id)) as any;
   
   if (!p)
    throw new CustomError(404, "Product not found");

   const response = await Product.updateById(p.id, req.fileObject);
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

 static async deleteSingleProduct(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const arr = await Product.findByUploader(req.payload.id);
   const arr2 = arr.map((m) => m.toJSON());
   const p = arr2.find((m: any) => m.id === req.params.id) as any;

   if (!p)
    throw new CustomError(404, "Product not found");

   const n = await Product.deleteById(p.id);
   const response = n + " item(s) deleted";
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

 static async deleteByUploader(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const n = await Product.deleteByUploader(req.payload.id);
   const response = n + " item(s) deleted";
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
}
