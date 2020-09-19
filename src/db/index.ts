import { Sequelize } from "sequelize";
import { AuthModel, SessionModel } from "./models";

export const sequelize = new Sequelize();

export const User = new AuthModel(sequelize);
export const Session = new SessionModel(sequelize);
