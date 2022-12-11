/* eslint-disable import/first */
import { config } from "dotenv";
import { resolve } from "path";

config({
  path: resolve(__dirname, "../.env"),
});

import App from "./app/app";

function run() {
  const app = new App();
  app.start(process.env.PORT);
}

run();
