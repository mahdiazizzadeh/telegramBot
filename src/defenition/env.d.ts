/* eslint-disable @typescript-eslint/naming-convention */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COOKIE_PARSER_SECRETKEY: string;
      PORT: number | string;
      JWT_SECRETKEY: string;
      BOT_SERCRETKEY: string;
      CHAT_ID: string;
    }
  }
}

export {};
