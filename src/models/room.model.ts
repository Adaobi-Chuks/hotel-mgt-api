import { model, Schema, Types } from 'mongoose';
import constants from "../config/constants.config";
const {DATABASES} = constants;

const RoomSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  roomType: {
    type: Types.ObjectId,
    ref: DATABASES.ROOMTYPE,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  floor: {
    type: Number,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: false,
    trim: true
  },
  amenities: {
    type: [String],
    required: false
  },
  booked: {
    type: Boolean,
    default: false,
    required: false,
    trim: true
  }
});

const Room = model(DATABASES.ROOM, RoomSchema);
export default Room;