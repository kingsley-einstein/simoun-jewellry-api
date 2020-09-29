import sequelize from "sequelize";
import { v4 as uuid } from "uuid";

export class CartModel {
 model: sequelize.ModelCtor<sequelize.Model>;

 constructor(s: sequelize.Sequelize) {
  this.define(s);
 }

 private define(s: sequelize.Sequelize) {
  this.model = s.define("Cart", {
   id: {
    type: sequelize.DataTypes.UUID,
    primaryKey: true
   },
   owner: {
    type: sequelize.DataTypes.UUID,
    allowNull: false
   }
  }, {
   hooks: {
    beforeCreate: (m: any) => {
     const id = uuid();
     m.id = id;
    }
   }
  });
 }

 associate(userDef: { model: sequelize.ModelStatic<sequelize.Model>; modelAs: string; }, productDef: { model: sequelize.ModelStatic<sequelize.Model>; modelAs: string; }) {
  const belongsTo = this.model.belongsTo(userDef.model, {
   onDelete: "CASCADE",
   onUpdate: "CASCADE",
   as: userDef.modelAs,
   foreignKey: "owner"
  });

  const hasMany = this.model.hasMany(productDef.model, {
   onDelete: "SET NULL",
   onUpdate: "CASCADE",
   as: productDef.modelAs
  });

  return [ belongsTo, hasMany ];
 }

 create(body: any): Promise<sequelize.Model> {
  return Promise.resolve(
   this.model.create(body)
  );
 }
}
