let options = {
  name: "default",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "myfam",
  logging: true,
  synchronize: true,
  entities: [__dirname + "/entity/*.js"],
  migrations: [__dirname + "/migration/*.js"],
  subscribers: [__dirname + "/subscriber/*.js"],
  cli: {
    entitiesDir: "/entity",
    migrationsDir: "/migration",
    subscribersDir: "/subscriber",
  },
};
module.exports = options;
