/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express, { json, Router } from "express";
import type { TelegramError } from "telegraf";

import type Iapp from "./interface/app.interface";
import v1Router from "./router";

export default class App implements Iapp {
  private readonly app: express.Application;
  private readonly router: Router;

  constructor() {
    this.app = express();
    this.router = Router();
  }

  start(port: number | string) {
    this.app.use(cors());
    this.app.use(json({ limit: "2000kb" }));

    this.app.use(this.router);
    this.router.use(v1Router);
    this.router.use(
      (err: TelegramError, req: Request, res: Response, next: NextFunction) => {
        return res.status(400).json({ ...err.response });
      }
    );
    this.app.listen(+port);
    console.log(`bot is listening on port ${port}`);
  }
}
