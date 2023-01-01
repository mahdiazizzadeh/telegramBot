/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/naming-convention */

import type { InputMedia, Message } from "telegraf/typings/core/types/typegram";
import type {
  ExtraAnimation,
  ExtraAudio,
  ExtraEditMessageMedia,
  ExtraEditMessageText,
  ExtraPhoto,
  ExtraReplyMessage,
  ExtraVideo,
  ExtraVoice,
} from "telegraf/typings/telegram-types";

export default interface IbotService {
  createPost: (
    chatId: string,
    text: string,
    extra: ExtraReplyMessage
  ) => Promise<Message.TextMessage>;

  updatePost: (
    chatId: string,
    messageId: number,
    text: string,
    extra: ExtraEditMessageText
  ) => Promise<any>;

  editMessageCaption: (
    chatId: string,
    messageId: number,
    caption: string,
    extra: ExtraEditMessageText
  ) => Promise<any>;

  editMessageMedia: (
    chatId: string,
    messageId: number,
    inlineMessageId: string,
    media: Buffer | string,
    options: Omit<InputMedia, "media">
  ) => Promise<any>;

  postPhoto: (
    chatId: string,
    photo: Buffer | string,
    extra: ExtraPhoto
  ) => Promise<Message.PhotoMessage>;

  postVideo: (
    chatId: string,
    video: Buffer | string,
    extra: ExtraVideo
  ) => Promise<Message.VideoMessage>;

  postAnimation: (
    chatId: string,
    animation: Buffer | string,
    extra: ExtraAnimation
  ) => Promise<Message.AnimationMessage>;

  postAudio: (
    chatId: string,
    audio: Buffer | string,
    extra: ExtraAudio
  ) => Promise<Message.AudioMessage>;

  postDocument: (
    chatId: string,
    document: Buffer | string,
    extra: ExtraAudio
  ) => Promise<Message.DocumentMessage>;

  postVoice: (
    chatId: string,
    voice: Buffer | string,
    options: ExtraVoice
  ) => Promise<Message.VoiceMessage>;

  sendPoll: (body: Record<any, any>) => Promise<Message.PollMessage>;

  forwardMessage: (body: Record<any, any>) => Promise<Message>;

  deleteMessage: (chatId: string, messageId: number) => Promise<true>;
}
