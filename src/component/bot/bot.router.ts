/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import multer, { memoryStorage } from "multer";

import wrapper from "../../error/errorHandler.wrapper";
import botController from "./bot.module";

const botRouter = Router();

botRouter.post(
  "/sendMessage",
  wrapper(botController.sendMessage.bind(botController))
);

botRouter.put(
  "/editMessage",
  wrapper(botController.editMessage.bind(botController))
);

botRouter.put(
  "/editMessageCaption",
  wrapper(botController.editMessageCaption.bind(botController))
);

botRouter.put(
  "/editMessageMedia/:type",
  multer({ storage: memoryStorage() }).single("media"),
  wrapper(botController.editMessageMedia.bind(botController))
);

botRouter.delete(
  "/deleteMessage",
  wrapper(botController.deleteMessage.bind(botController))
);

botRouter.post(
  "/sendMedia/:type",
  multer({ storage: memoryStorage() }).single("media"),
  wrapper(botController.sendMedia.bind(botController))
);

export default botRouter;
