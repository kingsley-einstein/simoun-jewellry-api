import { Sequelize } from "sequelize";
import { AuthModel } from "./models";

export const sequelize = new Sequelize();

export const User = new AuthModel(sequelize);
