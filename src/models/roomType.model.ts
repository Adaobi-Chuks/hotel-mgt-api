import { model, Schema } from 'mongoose';
import constants from "../config/constants.config";

const RoomTypeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  }
});

const RoomType = model(constants.DATABASES.ROOMTYPE, RoomTypeSchema);
export default RoomType;