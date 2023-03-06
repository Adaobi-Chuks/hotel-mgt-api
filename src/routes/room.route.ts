import RoomController from '../controllers/room.controller';
const { addRoom, getRoomById, getAllRooms, editRoomById, deleteRoomById } = new RoomController();
import express from 'express';
const router = express.Router();
import authenticate from "../middlewares/authentication.middleware";
import authorizeAdmin from "../middlewares/authorization.middleware";
import { validateRoomReq, validateRoomOpt } from "../middlewares/roomValidation.middleware";

//create a room
router.post("/", authenticate, authorizeAdmin, validateRoomReq, addRoom);

//get room using id
router.get("/:id", getRoomById);

//get all rooms with some queries
router.get("/", getAllRooms);

//edit room details with id
router.patch("/:id", authenticate, authorizeAdmin, validateRoomOpt, editRoomById);

//deleting a room details with an id
router.delete("/:id", authenticate, authorizeAdmin,  deleteRoomById);

export default router;