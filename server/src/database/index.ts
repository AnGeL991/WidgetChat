import mongose from "mongoose";
import { config } from "../config";

export const connectToDb = async () => {
  await mongose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
      console.log("Connected to mongoDB!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
