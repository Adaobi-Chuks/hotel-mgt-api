import RoomTypeController from '../controllers/roomType.controller';
import express from 'express';
import authenticate from "../middlewares/authentication.middleware";
import authorizeAdmin from "../middlewares/authorization.middleware";
import validateRoomType from "../middlewares/roomTypeValidation.middleware";
const { addRoomType, getAllRoomTypes, getRoomTypeById, deleteRoomTypeById } = new RoomTypeController();
const router = express.Router();

//create a room type
router.post("/", authenticate, authorizeAdmin, validateRoomType, addRoomType);

//Get a room types
router.get("/:id", getRoomTypeById);

//Get all room types
router.get("/", getAllRoomTypes);

//Delete a room type using Id
router.delete("/:id", authenticate, authorizeAdmin, deleteRoomTypeById);

export default router;