import sequelize from "sequelize";
import { v4 as uuid } from "uuid";

export class ProductModel {
 model: sequelize.ModelCtor<sequelize.Model>;
 constructor(s: sequelize.Sequelize) {
  this.define(s);
 }

 private define(s: sequelize.Sequelize) {
  this.model = s.define("Product", {
   id: {
    type: sequelize.DataTypes.UUID,
    primaryKey: true
   },
   name: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
     notEmpty: {
      msg: "Product name is required."
     }
    }
   },
   price: {
    type: sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
     isNumeric: true
    }
   },
   mimetype: {
    type: sequelize.DataTypes.STRING,
    allowNull: false
   },
   bytes64: {
    type: sequelize.DataTypes.TEXT,
    allowNull: false
   }
  },{
   hooks: {
    beforeCreate: (m: any) => {
     const id = uuid();
     m.id = id;
    }
   }
  });
 }

 create(body: any): Promise<sequelize.Model> {
  return Promise.resolve(
   this.model.create(body)
  );
 }

 findById(id: any): Promise<sequelize.Model> {
  return Promise.resolve(
   this.model.findByPk(id)
  );
 }

 async updateById(id: any, update: any): Promise<sequelize.Model> {
  const [, [ u ]] = await this.model.update(update, {
   where: { id }
  });
  return Promise.resolve(u); 
 }

 deleteById(id: any): Promise<number> {
  return Promise.resolve(
   this.model.destroy({
    where: { id }
   })
  );
 }
}
