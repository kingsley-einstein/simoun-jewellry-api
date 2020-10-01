import express from "express";
import { Cart } from "../db";
import { CustomError } from "../custom";

export class CartController {
 static async create(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const { payload } = req;
   const response = (await Cart.create({ owner: payload.id })).toJSON();
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

 static async findByOwner(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const { payload } = req;
   const response = (await Cart.findByOwner(payload.id)).map((c) => c.toJSON());
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

 static async findById(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const { payload, params } = req;
   const carts = (await Cart.findByOwner(payload.id)).map((c) => c.toJSON());
   const cX = carts.find((c: any) => c.id === params.id);

   if (!cX)
    throw new CustomError(404, "Cart not found.");

   res.status(200).json({
    statusCode: 200,
    response: cX
   });
  } catch (error) {
   res.status(error.c || 500).json({
    statusCode: error.c || 500,
    response: error.message
   });
  }
 }

 static async deleteById(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const { payload, params } = req;
   const carts = (await Cart.findByOwner(payload.id)).map((c) => c.toJSON());
   const cX: any = carts.find((c: any) => c.id === params.id);

   if (!cX)
    throw new CustomError(404, "Cart not found.");

   const del = await Cart.deleteSingleCart(cX.id);
   const response = del + " item deleted";
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

 static async deleteAll(req: express.Request & { payload: any; }, res: express.Response) {
  try {
   const { payload } = req;
   const del = await Cart.deleteAllCarts(payload.id);
   const response = del + " items deleted";
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
