import type { Telegraf } from "telegraf";
import type { InputMedia } from "telegraf/typings/core/types/typegram";
import type {
  ExtraAnimation,
  ExtraAudio,
  ExtraDocument,
  ExtraEditMessageMedia,
  ExtraEditMessageText,
  ExtraPhoto,
  ExtraReplyMessage,
  ExtraVideo,
  ExtraVoice,
} from "telegraf/typings/telegram-types";

import type IbotService from "./interface/botService.interface";

class BotService implements IbotService {
  constructor(private readonly telegramClient: Telegraf) {}

  createPost(chatId: string, text: string, extra: ExtraReplyMessage) {
    return this.telegramClient.telegram.sendMessage(chatId, text, extra);
  }

  updatePost(
    chatId: string,
    messageId: number,
    text: string,
    extra: ExtraEditMessageText
  ) {
    return this.telegramClient.telegram.editMessageText(
      chatId,
      messageId,
      undefined,
      text,
      extra
    );
  }

  editMessageCaption(
    chatId: string,
    messageId: number,
    caption: string,
    extra: ExtraEditMessageText
  ) {
    return this.telegramClient.telegram.editMessageCaption(
      chatId,
      messageId,
      undefined,
      caption,
      extra
    );
  }

  editMessageMedia(
    chatId: string,
    messageId: number,
    inlineMessageId: string,
    media: Buffer | string,
    options: Omit<InputMedia, "media">
  ) {
    if (typeof media === "string")
      return this.telegramClient.telegram.editMessageMedia(
        chatId,
        messageId,
        inlineMessageId,
        {
          media: {
            url: media,
          },
        ...options
        },
      );
    return this.telegramClient.telegram.editMessageMedia(
      chatId,
      messageId,
      inlineMessageId,
      {
        media: {
          source: media,
        },
        ...options
      }
    );
  }

  postVideo(chatId: string, video: Buffer | string, extra: ExtraVideo) {
    return typeof video === "string"
      ? this.telegramClient.telegram.sendVideo(
          chatId,
          { url: video },
          { ...extra }
        )
      : this.telegramClient.telegram.sendVideo(
          chatId,
          { source: video },
          { ...extra }
        );
  }

  deleteMessage(chatId: string, messageId: number) {
    return this.telegramClient.telegram.deleteMessage(chatId, messageId);
  }

  postPhoto(chatId: string, photo: Buffer | string, extra: ExtraPhoto) {
    return typeof photo === "string"
      ? this.telegramClient.telegram.sendPhoto(
          chatId,
          { url: photo },
          { ...extra }
        )
      : this.telegramClient.telegram.sendPhoto(
          chatId,
          { source: photo },
          { ...extra }
        );
  }

  postDocument(
    chatId: string,
    document: Buffer | string,
    extra: ExtraDocument
  ) {
    return typeof document === "string"
      ? this.telegramClient.telegram.sendDocument(
          chatId,
          { url: document },
          { ...extra }
        )
      : this.telegramClient.telegram.sendDocument(
          chatId,
          { source: document },
          { ...extra }
        );
  }

  sendPoll(body: Record<any, any>) {
    const { chat_id, options, question, extra } = body;
    return this.telegramClient.telegram.sendPoll(
      chat_id,
      question,
      options,
      extra
    );
  }

  forwardMessage(body: Record<any, any>) {
    const { chat_id, fromChatId, messageId, extra } = body;
    return this.telegramClient.telegram.forwardMessage(
      chat_id,
      fromChatId,
      messageId,
      extra
    );
  }

  postVoice(chatId: string, voice: Buffer | string, extra: ExtraVoice) {
    return typeof voice === "string"
      ? this.telegramClient.telegram.sendVoice(
          chatId,
          { url: voice },
          { ...extra }
        )
      : this.telegramClient.telegram.sendVoice(
          chatId,
          { source: voice },
          { ...extra }
        );
  }

  postAudio(chatId: string, audio: Buffer | string, extra: ExtraAudio) {
    return typeof audio === "string"
      ? this.telegramClient.telegram.sendAudio(
          chatId,
          { url: audio },
          { ...extra }
        )
      : this.telegramClient.telegram.sendAudio(
          chatId,
          { source: audio },
          { ...extra }
        );
  }

  postAnimation(chatId: string, photo: Buffer | string, extra: ExtraAnimation) {
    return typeof photo === "string"
      ? this.telegramClient.telegram.sendAnimation(
          chatId,
          { url: photo },
          { ...extra }
        )
      : this.telegramClient.telegram.sendAnimation(
          chatId,
          { source: photo },
          { ...extra }
        );
  }
}

export default BotService;
