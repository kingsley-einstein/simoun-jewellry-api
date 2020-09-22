import { Sequelize } from "sequelize";
import { AuthModel, SessionModel } from "./models";
import config from "./config";

export const sequelize = new Sequelize({
 ...config[process.env.NODE_ENV]
});

export const User = new AuthModel(sequelize);
export const Session = new SessionModel(sequelize);
