import express from "express";
import { logger } from "../middlewares";

export default (app: express.Application) => {
 app.use(logger);
};
