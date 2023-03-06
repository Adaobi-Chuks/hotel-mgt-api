import RoomService from "../services/room.service";
import constants from "../config/constants.config";
import { Request, Response } from "express";
const {
    getRoom,
    addRoom,
    findById,
    deleteRoomById,
    editRoomById,
    getAllRooms
} = new RoomService();
const {
    CREATED, 
    FETCHED, 
    FETCHEDALL, 
    UPDATED, 
    DELETED, 
    DUPLICATE_ERROR, 
    INVALID_ID_ERROR
} = constants.MESSAGES.ROOM;

export default class Controller {

    //create room
    async addRoom(req: Request, res: Response) {
        const body = req.body;
        //check to see if a room with name exists
        const existingRoom = await getRoom(body.name.toLowerCase());
        //sends an error if the name exists
        if(existingRoom) {
            return res.status(403)
                .send({
                    message: DUPLICATE_ERROR,
                    success: false
                });
        }
        //create a room if the name doesn't exist
        const createdRoom = await addRoom(body);
        return res.status(201)
            .send({
                message: CREATED,
                success: true,
                data: createdRoom
            });
    }

    //get room using id
    async getRoomById(req: Request, res: Response) {
        const id = req.params.id;
        //check to see if a room with id exists
        const roomToGet = await findById(id);
        //return a status of ok if the room exists
        if(roomToGet) return res.status(200)
            .send({
                message: FETCHED,
                success: true,
                data: roomToGet
            });
        //sends an error if the room doesn't exists
        return res.status(404)
            .send({
                message: INVALID_ID_ERROR,
                success: false
            });
    }

    //get all rooms with some queries
    async getAllRooms(req: Request, res: Response) {
        const {search, roomType, minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER} = req.query;
        let queries: Record<string, any> = {};
        if (typeof search === 'string') {
            queries.codeName = { $regex: new RegExp(search.toLowerCase(), "i") };
        }
        if (roomType) {
            queries.roomType = roomType;
        }
        if (minPrice) {
            queries.prize = {$gte: parseInt(minPrice as string)}
        }
        if (maxPrice) {
            queries.prize = {$lte: parseInt(maxPrice as string)}
        }
        const rooms = await getAllRooms(queries);
        return res.status(200)
            .send({
                message: FETCHEDALL,
                success: true,
                data: rooms
            });
    }

    //edit room details with id
    async editRoomById(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body;
        // Fetch the room with the id
        const existingRoom = await findById(id);
        if(!existingRoom) {
            return res.status(404).json({
                message: INVALID_ID_ERROR,
                success: false
            })
        }
        // Fetching existing room name
        if(data.name){
            const existingRoomWithName  = await getRoom(data.name.toLowerCase())
            if(existingRoomWithName){
                if(existingRoomWithName._id.toString() !== id){
                    return res.status(403).json({
                        success: false,
                        message: DUPLICATE_ERROR
                    })
                }
            }
        }
        const updatedRoom = await editRoomById(id, data)
        return res.status(200).json({
            success: true,
            message: UPDATED,
            data: updatedRoom
        })
    }

    //deleting a room details with an id
    async deleteRoomById(req: Request, res: Response) {
        const id = req.params.id;
        //check to see if a roomtype with id exists
        const roomToDelete = await findById(id);
        //deletes the roomtype if the id exist
        if(roomToDelete) {
            const deletedRoom = await deleteRoomById(id);
            return res.status(201).send({
                message: DELETED,
                success: true,
                data: deletedRoom
            });
        }
        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: INVALID_ID_ERROR
            });    
    }
}