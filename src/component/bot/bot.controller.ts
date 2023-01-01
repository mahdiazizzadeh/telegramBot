/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-meaningless-void-operator */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import type { Request, Response } from "express";

import {
  deleteMessageSchema,
  editMessageCaptionSchema,
  postSchema,
  updatePostSchema,
} from "./bot.validator";
import type IbotService from "./interface/botService.interface";

class BotController {
  constructor(private readonly botService: IbotService) {}

  private selectFields<T>(object: Record<any, any>, selectField: string[]): T {
    const res = Object.entries(object).map((fields) =>
      selectField.map((select) => (fields[0] === select ? fields : [])).flat()
    );

    if (res[res.length - 1].length === 0) res.pop();

    return Object.fromEntries(res);
  }

  private getFields(queries: Record<any, any>) {
    return Object.entries(queries)
      .flat()
      .filter((p) => p !== "") as string[];
  }

  async sendMessage(req: Request, res: Response) {
    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res.status(400).json({
        validationError: true,
        errors: error.details,
      });

    const sendedMessage = await this.botService.createPost(
      req.body.chat_id,
      req.body.text,
      req.body.options
    );

    const fields = this.getFields(req.query);
    if (fields.length > 0)
      return res
        .status(200)
        .json({ ...this.selectFields(sendedMessage, fields) });

    return res.status(200).json({ ...sendedMessage });
  }

  async editMessage(req: Request, res: Response) {
    const { error } = updatePostSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        validationError: true,
        errors: error.details,
      });

    const updatedPost = await this.botService.updatePost(
      req.body.chat_id,
      req.body.message_id,
      req.body.text,
      req.body.options
    );

    const fields = this.getFields(req.query);
    if (fields.length > 0)
      return res
        .status(200)
        .json({ ...this.selectFields(updatedPost, fields) });

    return res.status(200).json({ ...updatedPost });
  }

  async editMessageCaption(req: Request, res: Response) {
    const { error } = editMessageCaptionSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        validationError: true,
        errors: error.details,
      });

    const editMessageCaption = await this.botService.editMessageCaption(
      req.body.chat_id,
      req.body.message_id,
      req.body.cation,
      req.body.options
    );

    const fields = this.getFields(req.query);
    if (fields.length > 0)
      return res
        .status(200)
        .json({ ...this.selectFields(editMessageCaption, fields) });

    return res.status(200).json({ ...editMessageCaption });
  }

  async editMessageMedia(req: Request, res: Response) {
    const { chat_id, message_id, inline_message_id, options } = req.body;
    const file: Buffer | string = !req.file ? req.body.media : req.file.buffer;

    const updatedPost = await this.botService.editMessageMedia(
      chat_id,
      message_id,
      inline_message_id,
      file,
      options
    );

    const fields = this.getFields(req.query);
    if (fields.length > 0)
      return res
        .status(200)
        .json({ ...this.selectFields(updatedPost, fields) });

    return res.status(200).json({ ...updatedPost });
  }

  async deleteMessage(req: Request, res: Response) {
    const { error } = deleteMessageSchema.validate(req.body);
    if (error)
      return res.status(400).json({
        validationError: true,
        errors: error.details,
      });

    const isposted = await this.botService.deleteMessage(
      req.body.chat_id,
      req.body.message_id
    );

    return res.status(200).json({ isposted });
  }

  public async sendMedia(req: Request, res: Response) {
    if (!req.params.type)
      return res.status(400).json({
        message: "invalid parameter",
      });

    switch (req.params.type) {
      case "photo": {
        if (req.body.photo) {
          const sendPhoto = await this.botService.postPhoto(
            req.body.chat_id,
            req.body.photo,
            req.body.options
          );

          const fields = this.getFields(req.query);
          if (fields.length > 0)
            return res
              .status(200)
              .json({ ...this.selectFields(sendPhoto, fields) });

          return res.status(200).json({ ...sendPhoto });
        }

        const sendPhoto = await this.botService.postPhoto(
          req.body.chat_id,
          req.file!.buffer,
          req.body.options
        );

        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(sendPhoto, fields) });

        return res.status(200).json({ ...sendPhoto });
      }

      case "video": {
        if (req.body.video) {
          const sendVideo = await this.botService.postVideo(
            req.body.chat_id,
            req.body.video,
            req.body.options
          );

          const fields = this.getFields(req.query);
          if (fields.length > 0)
            return res
              .status(200)
              .json({ ...this.selectFields(sendVideo, fields) });

          return res.status(200).json({ ...sendVideo });
        }

        const sendVideo = await this.botService.postVideo(
          req.body.chat_id,
          req.file!.buffer,
          req.body.options
        );

        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(sendVideo, fields) });

        return res.status(200).json({ ...sendVideo });
      }

      case "animation": {
        if (req.body.animation) {
          const sendAnimation = await this.botService.postAnimation(
            req.body.chat_id,
            req.body.animation,
            req.body.options
          );

          const fields = this.getFields(req.query);
          if (fields.length > 0)
            return res
              .status(200)
              .json({ ...this.selectFields(sendAnimation, fields) });

          return res.status(200).json({ ...sendAnimation });
        }

        const sendAnimation = await this.botService.postAnimation(
          req.body.chat_id,
          req.file!.buffer,
          req.body.options
        );

        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(sendAnimation, fields) });

        return res.status(200).json({ ...sendAnimation });
      }

      case "audio": {
        if (req.body.audio) {
          const sendAudio = await this.botService.postAudio(
            req.body.chat_id,
            req.body.audio,
            req.body.options
          );

          const fields = this.getFields(req.query);
          if (fields.length > 0)
            return res
              .status(200)
              .json({ ...this.selectFields(sendAudio, fields) });

          return res.status(200).json({ ...sendAudio });
        }

        const sendAudio = await this.botService.postAudio(
          req.body.chat_id,
          req.file!.buffer,
          req.body.options
        );

        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(sendAudio, fields) });

        return res.status(200).json({ ...sendAudio });
      }

      case "document": {
        if (req.body.document) {
          const sendDocument = await this.botService.postDocument(
            req.body.chat_id,
            req.body.document,
            req.body.options
          );

          const fields = this.getFields(req.query);
          if (fields.length > 0)
            return res
              .status(200)
              .json({ ...this.selectFields(sendDocument, fields) });

          return res.status(200).json({ ...sendDocument });
        }

        const sendDocument = await this.botService.postDocument(
          req.body.chat_id,
          req.file!.buffer,
          req.body.options
        );

        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(sendDocument, fields) });

        return res.status(200).json({ ...sendDocument });
      }

      case "voice": {
        if (req.body.voice) {
          const sendVoice = await this.botService.postVoice(
            req.body.chat_id,
            req.body.voice,
            req.body.options
          );

          const fields = this.getFields(req.query);
          if (fields.length > 0)
            return res
              .status(200)
              .json({ ...this.selectFields(sendVoice, fields) });

          return res.status(200).json({ ...sendVoice });
        }

        const sendVoice = await this.botService.postVoice(
          req.body.chat_id,
          req.file!.buffer,
          req.body.options
        );

        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(sendVoice, fields) });

        return res.status(200).json({ ...sendVoice });
      }

      case "poll": {
        const sendPoll = await this.botService.sendPoll(req.body);
        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(sendPoll, fields) });

        return res.status(200).json({ ...sendPoll });
      }

      case "forwardMessage": {
        const forwardMessage = await this.botService.forwardMessage(req.body);
        const fields = this.getFields(req.query);
        if (fields.length > 0)
          return res
            .status(200)
            .json({ ...this.selectFields(forwardMessage, fields) });

        return res.status(200).json({ ...forwardMessage });
      }

      default:
        return res.status(400).json({
          message: "invalid parameter",
        });
    }
  }
}

export default BotController;
