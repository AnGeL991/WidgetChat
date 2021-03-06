import mongoose, { Schema } from "mongoose";
import { ISetting, ISettingModel } from "../interfaces/settings";

const settingsSchema = new Schema({
  telegram_id: {
    type: String,
  },
  bots: [{ type: String }],
});

settingsSchema.statics.updateSetting = async function (id, bot) {
  try {
    return await this.findOneAndUpdate(
      { _id: id },
      { $addToSet: { bots: [bot] } }
    );
  } catch (err) {
    throw new Error(err.message);
  }
};
settingsSchema.statics.newSetting = async function () {
  try {
    const newSettings = new this();
    return await newSettings.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const SettingsModel = mongoose.model<ISetting, ISettingModel>(
  "Setting",
  settingsSchema
);
