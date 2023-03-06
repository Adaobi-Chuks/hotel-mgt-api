import RoomType from '../models/roomType.model';
import IRoomType from '../interfaces/roomType.interface';

export default class RoomTypeService {

    //create roomtype
    async addRoomType(type: IRoomType) {
        return await RoomType.create(type);
    }

    //get a roomtype with name
    async getRoomType(name: string) {
        return await RoomType.findOne({name}, "-__v");
    }

    //get a roomtype with id
    async findById(id: string) {
        return await RoomType.findById(id, "-__v");
    }

    //get all roomtypes
    async getAllRoomTypes() {
        return await RoomType.find({}, "-__v");
    }

    //delete room type using an id
    async deleteRoomTypeById(id: string) {
        return await RoomType.findByIdAndDelete(id);
    }

}