import express from "express";
import debug from "debug";

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || "18000");
const log = debug("app");

app.listen(port, () => log(`Express server running on port: ${port}`));

export default app;
