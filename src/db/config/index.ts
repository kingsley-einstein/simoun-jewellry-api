const config = {
 development: {
  host: "",
  port: 0,
  dialect: "postgres",
  define: {
   underscored: true
  },
  sync: {
   force: false
  }
 }
};

export default config;
