import User from "../models/user.model";
import IUser, {IUserWithId} from "../interfaces/user.interface";
import constants from "../config/constants.config";
import _ from "lodash";
import jwt from "jsonwebtoken";
const {MAXAGE, SECRET} =  constants;

export default class UserService {
    
    //finds a user by email
    async findByEmail(email: string) {
        return await User.findOne({email}, "-__v -password");
    }

    //finds a user by email
    async findByEmailWithP(email: string) {
        return await User.findOne({email}, "-__v");
    }

    //finds a user by id
    async findById(id: string) {
        return await User.findById(id, "-__v -password");
    }

    //create room
    async createUser(user: Partial<IUser>) {
        const _user = await User.create(user);
        return await User.findOne({ _id: _user.id}, "-__v -password");
    }

    //get all users
    async getAllUsers() {
        return await User.find({}, "-__v -password");
    }

    //edit user details with id
    async editUserById(id: string, obj: Partial<IUser>) {
        return await User.findByIdAndUpdate(id, { $set: obj }, { new: true }).select("-password");
    }

    //deleting a user details with an id
    async deleteUserById(id: string) {
        return await User.findByIdAndDelete(id);
    }

    //creates a json web token
    generateAuthToken (user: IUserWithId) {
        return jwt.sign({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }, SECRET, {
            expiresIn: MAXAGE
        });
    };
}