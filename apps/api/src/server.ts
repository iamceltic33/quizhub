import bodyParser from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { getQuizPlease, getShaker } from './parsers/sites'

const { json, urlencoded } = bodyParser;

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/all", async (req, res) => {
      const quizPlease = await getQuizPlease();
      const shaker = await getShaker();
      res.send({ data: {
        quizPlease, shaker
      } })
    })

  return app;
};
