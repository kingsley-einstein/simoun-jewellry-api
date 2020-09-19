import sequelize from "sequelize";

export class SessionModel {
 model: sequelize.ModelCtor<sequelize.Model>;
 constructor(s: sequelize.Sequelize) {
  this.define(s);
 }

 private define(s: sequelize.Sequelize) {
  this.model = s.define("Session", {
   id: {
    type: sequelize.DataTypes.UUID,
    primaryKey: true
   }
  });
 }

 invalidate(id: string): Promise<sequelize.Model> {
  return Promise.resolve(
   this.model.create({ id })
  );
 }

 async isInvalid(id: string): Promise<boolean> {
  const doc = await this.model.findByPk(id);
  return Promise.resolve(!!doc);
 }
}
