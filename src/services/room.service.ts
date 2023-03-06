import IRoom from "../interfaces/room.interface";
import Room from '../models/room.model';

export default class RoomService {

    //create room
    async addRoom(room: IRoom) {
        return await Room.create(room);
    }

    //get a room using a name
    async getRoom(name: string) {
        return await Room.findOne({name}, "-__v");
    }
    
    //finds a room by id
    async findById(id: string) {
        return await Room.findById(id, "-__v");
    }

    //get rooms with a filter
    async getAllRooms(filter: Partial<IRoom>) {
        return await Room.find(filter, "-__v");
    }

    //edit room details with id
    async editRoomById(id: string, obj: Partial<IRoom>) {
        return await Room.findByIdAndUpdate(id, { $set: obj }, { new: true });
    }

    //deleting a room details with an id
    async deleteRoomById(id: string) {
        return await Room.findByIdAndDelete(id);
    }

}