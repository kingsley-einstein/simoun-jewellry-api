import express from "express";
import debug from "debug";
import { sequelize } from "./db";
import config from "./config";

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || "18000");
const log = debug("app");

config(app);

app.listen(port, async () => {
 log(`Express server running on port: ${port}`);
 const s = sequelize.sync();
 if (s)
  log("Sequelize connected");
});

export default app;
