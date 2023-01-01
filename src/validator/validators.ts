/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import Joi from "joi";

interface IphotoType {
  size: number;
  mimeType: string;
}
const duration = () =>
  Joi.number().messages({
    "any.required": "please send duration of the video",
    "number.base": "please send duration of the video",
  });

const width = () =>
  Joi.number().messages({
    "any.required": "please send width of the video",
    "number.base": "please send width of the video",
  });
const height = () =>
  Joi.number().messages({
    "number.base": "please send height of the video",
    "any.required": "please send height of the video",
  });

const photo = () =>
  Joi.custom((value: IphotoType | string, helper) => {
    const validMimeType = ["image/png", "image/jpg", "image/jpeg"];

    if (typeof value === "string") return value;
    if (typeof value !== "object") return helper.error("invalid.argument");
    if (!validMimeType.includes(value.mimeType) || value.size >= 100000)
      return helper.error("invalid.argument");

    return value;
  }).messages({
    "any.required": "please send photo",
    "invalid.argument": "please send photo",
  });

const video = () =>
  Joi.custom((value: IphotoType | string, helper) => {
    if (typeof value === "string") return value;
    if (typeof value !== "object") return helper.error("invalid.argument");
    if (value.mimeType !== "video/mp4" || value.size >= 5000000)
      return helper.error("invalid.argument");

    return value;
  }).messages({
    "any.required": "please send video",
    "invalid.argument": "please send video",
  });

const message_id = () =>
  Joi.number().messages({
    "number.base": "message id id is not valid, please send number",
    "any.required": "message id id is required",
  });

const parse_mode = () =>
  Joi.string().valid("MarkdownV2", "Markdown", "HTML").messages({
    "string.base": "parse mode is not valid",
    "string.parse": " mode cannot be empty",
    "any.required": "parse mode required",
    "any.only": "invalid parse mode",
  });

const disable_web_page_preview = () =>
  Joi.boolean().messages({
    "any.required": "disable web page preview is required",
    "boolean.base": "disable web page is not valid",
  });

const disable_notification = () =>
  Joi.boolean().messages({
    "any.required": "disable notification is required",
    "boolean.base": "disable notification is not valid",
  });
const protect_content = () =>
  Joi.boolean().messages({
    "any.required": "protect content is required",
    "boolean.base": "protect content is not valid",
  });

const reply_to_message_id = () =>
  Joi.number().messages({
    "number.base": "reply to message id id is not valid, please send number",
    "any.required": "reply to message id id is required",
  });

const allow_sending_without_reply = () =>
  Joi.boolean().messages({
    "any.required": "allow sending without reply is required",
    "boolean.base": "allow sending without reply is not valid",
  });

const chat_id = () =>
  Joi.string()
    .required()
    .min(5)
    .custom((value: string, helper) => {
      if (value.at(0) !== "@") return helper.error("invalid.chatId");
      return value;
    })
    .messages({
      "string.base": "chat id is not valid",
      "string.empty": "chat id cannot be empty",
      "any.required": "chat id required, please enter chat id",
      "string.min": "chat id length cannot be 5 character",
    });

const message_thread_id = () =>
  Joi.number().messages({
    "number.base": "message thread id is not valid, please send number",
    "any.required": "message thread id is required",
  });

const text = () =>
  Joi.string().messages({
    "string.base": "please send text",
    "string.empty": "text cannot be empty",
    "any.required": "please send text",
  });

const caption = () =>
  Joi.string().min(0).messages({
    "string.base": "please send string",
    "string.empty": "please send caption",
    "any.required": "please send caption",
    "string.min": "please send caption",
  });

const user = Joi.object({
  id: Joi.number().required(),
  is_bot: Joi.boolean().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string(),
  username: Joi.string(),
  language_code: Joi.string().min(2).max(3),
  is_premium: Joi.allow(true),
  added_to_attachment_menu: Joi.allow(true),
  can_join_groups: Joi.boolean(),
  can_read_all_group_messages: Joi.boolean(),
  supports_inline_queries: Joi.boolean(),
});

const caption_entities = () =>
  Joi.object({
    type: Joi.string()
      .required()
      .required()
      .valid(
        "mention",
        "hashtag",
        "cashtag",
        "bot_command",
        "url",
        "email",
        "phone_number",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "spoiler",
        "code",
        "pre",
        "text_link",
        "text_mention",
        "custom_emoji"
      ),
    offset: Joi.number().required().min(0),
    length: Joi.number().required().min(0),
    url: Joi.string(),
    language: Joi.string(),
    custom_emoji_id: Joi.string(),
    user,
  });

const type = (t: string) => Joi.string().valid([t]);

export {
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
  type,
  user,
  video,
};
