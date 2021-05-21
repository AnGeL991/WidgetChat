import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "localhost";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "27017";
const MONGO_DB = process.env.MONGO_DB || "Widget";
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@angel.f9tbg.mongodb.net/${MONGO_DB}`,
};
const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

const BOT_TOKEN = process.env.bot_token || "bot";
const BOT = {
  token: BOT_TOKEN,
};

export const config = {
  mongo: MONGO,
  bot: BOT,
  url,
};
