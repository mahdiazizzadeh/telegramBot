import { Telegraf } from "telegraf";

const getTelgramCleint = (token: string) => new Telegraf(token);

export default getTelgramCleint;
