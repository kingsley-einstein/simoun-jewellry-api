import dotenv from "dotenv";

dotenv.config();

const env = {
 jwt_secret: process.env.JWT_SECRET,
 db: {
  development: {
   database: process.env.DB_NAME,
   host: process.env.DB_HOST,
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   port: parseInt(process.env.DB_PORT)
  }
 }
};

export default env;
