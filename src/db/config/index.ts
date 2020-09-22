const config = {
 development: {
  host: "",
  port: 0,
  dialect: "postgres",
  database: "",
  define: {
   underscored: true
  },
  sync: {
   force: false,
   alter: true
  }
 },
 production: {
  host: "",
  port: 0,
  dialect: "postgres",
  database: "",
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
