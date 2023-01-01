/* eslint-disable @typescript-eslint/naming-convention */
import Joi from "joi";

import {
  allow_sending_without_reply,
  caption,
  caption_entities,
  chat_id,
  disable_notification,
  disable_web_page_preview,
  message_id,
  message_thread_id,
  parse_mode,
  photo,
  protect_content,
  reply_to_message_id,
  text,
  video,
} from "../../validator/validators";

const postSchema = Joi.object({
  chat_id: chat_id(),
  text: text().required(),
  options: Joi.object({
    message_thread_id: message_thread_id(),
    parse_mode: parse_mode(),
    disable_web_page_preview: disable_web_page_preview(),
    disable_notification: disable_notification(),
    protect_content: protect_content(),
    reply_to_message_id: reply_to_message_id(),
    allow_sending_without_reply: allow_sending_without_reply(),
  }),
});

const updatePostSchema = Joi.object({
  chat_id: chat_id(),
  message_id: message_id(),
  text: text().required(),
  options: Joi.object({
    parse_mode: parse_mode(),
    disable_web_page_preview: disable_web_page_preview(),
  }),
});

const editMessageCaptionSchema = Joi.object({
  chat_id: chat_id(),
  message_id: message_id().required(),
  caption: caption().required(),
  options: Joi.object({
    parse_mode: parse_mode(),
    caption_entities: caption_entities(),
  }),
});

const sendPhotoSchema = Joi.object({
  chat_id: chat_id(),
  message_thread_id: message_thread_id(),
  photo: photo(),
  caption: caption(),
  parse_mode: parse_mode(),
  caption_entities: caption_entities(),
  disable_notification: disable_notification(),
  protect_content: protect_content(),
  reply_to_message_id: reply_to_message_id(),
  allow_sending_without_reply: allow_sending_without_reply(),
});

const sendVideoSchema = Joi.object({
  chat_id: chat_id(),
  message_thread_id: message_thread_id(),
  video: video(),
});

const deleteMessageSchema = Joi.object({
  chat_id: chat_id(),
  message_id: message_id().required(),
});

// const editMessageMediaAnimationSchema = Joi.object({
//   chat_id: chat_id(),
//   message_id: message_id().required(),
//   media,
// });

// const editMessageMediaDocumentSchema = Joi.object({
//   chat_id: chat_id(),
//   message_id: message_id().required(),
//   media,
// });

// const editMessageMediaAudioSchema = Joi.object({
//   chat_id: chat_id(),
//   message_id: message_id().required(),
//   media,
// });

// const editMessageMediaPhotoSchema = Joi.object({
//   chat_id: chat_id(),
//   message_id: message_id().required(),
//   media,
// });

// const editMessageMediaVideoSchema = Joi.object({
//   chat_id: chat_id(),
//   message_id: message_id().required(),
//   media,
// });

export {
  deleteMessageSchema,
  editMessageCaptionSchema,
  postSchema,
  sendPhotoSchema,
  sendVideoSchema,
  updatePostSchema,
};
