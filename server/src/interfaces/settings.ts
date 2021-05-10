import { Document, Model } from "mongoose";

export interface ISetting extends Document {
  telegram_id: string;
  bots: Array<string>;
}

export interface ISettingModel extends Model<ISetting> {
  updateSetting(id: string, bot: string): Promise<void>;
}
