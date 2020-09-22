import express from "express";
import { logger } from "../middlewares";
import router from "../router";

export default (app: express.Application) => {
 app.use(express.json());
 app.use(express.urlencoded({
  extended: false
 }));
 app.use(logger);
 app.use("/api/v1", router);
};
