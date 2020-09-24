import sequelize from "sequelize";
import { v4 as uuid } from "uuid";
import { BCrypt } from "../../helpers";

export class AuthModel {
 model: sequelize.ModelCtor<sequelize.Model>;
 constructor(s: sequelize.Sequelize) {
  this.define(s);
 }

 private define(s: sequelize.Sequelize) {
  this.model = s.define("User", {
   id: {
    type: sequelize.DataTypes.UUID,
    primaryKey: true
   },
   email: {
    type: sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
     isEmail: {
      msg: "Email is invalid."
     },
     notEmpty: {
      msg: "Email cannot be empty."
     }
    }
   },
   password: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
     notEmpty: {
      msg: "Password is required."
     }
    }
   }
  }, {
   timestamps: true,
   hooks: {
    beforeCreate: (m: any) => {
     const id = uuid();
     m.id = id;
    },
    beforeSave: (m: any) => {
     if (m.changed("password"))
      m.password = BCrypt.hashPw(m.password)
    }
   }
  });
 }

 create(body: any): Promise<sequelize.Model> {
  return Promise.resolve(
   this.model.create(body)
  );
 }

 findById(id: string): Promise<sequelize.Model> {
  return Promise.resolve(
   this.model.findByPk(id)
  );
 }

 findByEmail(email: string): Promise<sequelize.Model> {
  return Promise.resolve(
   this.model.findOne({
    where: { email }
   })
  );
 }

 async updateById(id: string, body: any): Promise<sequelize.Model> {
  const u = await this.model.update(body, {
   where: { id }
  });
  const [, [ doc ] ] = u;
  return Promise.resolve(doc); 
 }

 getModel() {
  return this.model;
 }
}
