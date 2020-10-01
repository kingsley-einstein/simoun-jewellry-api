import { Sequelize } from "sequelize";
import { AuthModel, SessionModel, ProductModel, CartModel } from "./models";
import config from "./config";

export const sequelize = new Sequelize({
 ...config[process.env.NODE_ENV]
});

export const User = new AuthModel(sequelize);
export const Session = new SessionModel(sequelize);
export const Product = new ProductModel(sequelize);
export const Cart = new CartModel(sequelize);

Product.associate(User.getModel(), "owner");
Cart.associate({ model: User.getModel(), modelAs: "ownedBy" }, { model: Product.getModel(), modelAs: "cart" });
