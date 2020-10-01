import env from "../../env";

const config = {
 development: {
  ...env.db.development,
  dialect: "postgres",
  define: {
   underscored: true
  },
  sync: {
   force: false,
   alter: true
  }
 },
 production: {
  ...env.db.production,
  dialect: "postgres",
  define: {
   underscored: true
  },
  sync: {
   force: false,
   alter: true
  }
 },
 test: {
  host: "",
  port: 0,
  dialect: "postgres",
  database: "",
  define: {
   underscored: true
  },
  sync: {
   force: true,
   alter: true
  }
 }
};

export default config;
