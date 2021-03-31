let options = {
  name: "default",
  type: "mysql",
  host: process.env.SERVER_HOST,
  port: Number(process.env.SERVER_PORT),
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  logging: Boolean(process.env.LOGGING),
  synchronize: Boolean(process.env.SYNCHRONIZE),
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
