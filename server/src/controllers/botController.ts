import { Request, Response } from "express";
import { SettingsModel } from "../models/settings";
import { errorHandler } from "../utils";

export const getSetting = async (req: Request, res: Response) => {
  errorHandler(res, SettingsModel.findOne(), 200, 500);
};
export const newSetting = async (req: Request, res: Response) => {
  const { id, bot } = req.body;
  errorHandler(res, SettingsModel.updateSetting(id, bot), 200, 500);
};
