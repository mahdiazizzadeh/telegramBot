import getTelgramCleint from "../../connections/telegramClient";
import BotController from "./bot.controller";
import BotService from "./bot.service";

const telegramClient = getTelgramCleint(process.env.BOT_SERCRETKEY);

const botService = new BotService(telegramClient);

const botController = new BotController(botService);

export default botController;
