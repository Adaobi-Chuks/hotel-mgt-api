import RoomTypeService from "../services/roomType.service";
import { Request, Response } from "express";
import constants from "../config/constants.config"
const {
    getRoomType,
    addRoomType,
    getAllRoomTypes,
    deleteRoomTypeById,
    findById
} = new RoomTypeService();
const {
    CREATED, 
    FETCHED, 
    DELETED, 
    DUPLICATE_ERROR, 
    INVALID_ID_ERROR
} = constants.MESSAGES.ROOMTYPE;

export default class RoomTypeController {

    //create roomtype
    async addRoomType(req: Request, res: Response) {
        const data = req.body;
        //check to see if a roomtype with name exists
        const existingRoomType = await getRoomType(data.name.toLowerCase());
        //sends an error if the name exists
        if(existingRoomType) {
            return res.status(403)
                .send({
                    message: DUPLICATE_ERROR,
                    success: false
                });
        }
        //create a room type if the name doesn't exist
        const createdRoomType = await addRoomType(data);
        return res.status(201)
            .send({
                message: CREATED,
                success: true,
                data: createdRoomType
            });
    }

    //get all roomtypes
    async getAllRoomTypes(req: Request, res: Response) {
        const roomTypes = await getAllRoomTypes();
        res.status(201)
            .send({
                message: FETCHED,
                success: true,
                data: roomTypes
            });
    }

    //gets a roomtype by an id
    async getRoomTypeById(req: Request, res: Response) {
        const id = req.params.id;
        const roomType = await findById(id);
    
        if (!roomType) {
          return res.status(404).send({
            success: false,
            message: INVALID_ID_ERROR
          });
        }

        return res.status(200).send({
          success: true,
          message: FETCHED,
          data: roomType
        });
    }
    
    //delete room type using an id
    async deleteRoomTypeById(req: Request, res: Response) {
        const id = req.params.id;
        //check to see if a roomtype with id exists
        const roomTypeToDelete = await findById(id);
        //deletes the roomtype if the id exist
        if(roomTypeToDelete) {
            const deletedRoomType = await deleteRoomTypeById(id);
            return res.status(201).send({
            message: DELETED,
            success: true,
            data: deletedRoomType
        });}
        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: INVALID_ID_ERROR
            });
    }
}