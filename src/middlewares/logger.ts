import express from "express";
import debug from "debug";

const log = debug("logging");

export const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
 res.on("finish", () => log(`${req.path} :-------------------------------: ${res.statusCode} :-------------------------------: ${req.method}`));
 next();
};
