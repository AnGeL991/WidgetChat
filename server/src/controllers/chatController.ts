import { Request, Response } from "express";
import { ChatModel } from "../models";
import { errorHandler } from "../utils";

export const createChat = (req: Request, res: Response) => {
  errorHandler(res, ChatModel.addNewChat(req.body), 200, 500);
};
export const getChat = (req: Request, res: Response) => {
  const { id } = req.body;
  errorHandler(res, ChatModel.getChat(id), 200, 500);
};
export const updateChat = (req: Request, res: Response) => {
  const { id, conversation } = req.body;
  errorHandler(res, ChatModel.updateChat(id, conversation), 200, 500);
};
export const deleteChat = (req: Request, res: Response) => {
  const { id } = req.body;
  errorHandler(res, ChatModel.deleteChat(id), 200, 500);
};
