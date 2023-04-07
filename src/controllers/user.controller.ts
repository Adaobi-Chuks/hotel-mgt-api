import UserService from "../services/user.service";
import bcrypt from "bcrypt";
import constants from "../config/constants.config";
import { Request, Response } from "express";
import User from "../models/user.model";
const {
    createUser, 
    generateAuthToken,
    getAllUsers,
    findById,
    editUserById,
    findByEmail,
    findByEmailWithP,
    deleteUserById
} = new UserService();
const {
    CREATED, 
    FETCHED, 
    FETCHEDALL, 
    UPDATED, 
    DELETED, 
    DUPLICATE_ERROR, 
    INVALID_ID_ERROR,
    INVALID_EMAIL_ERROR,
    INVALID_PASSWORD_ERROR,
    LOGIN,
    LOGGEDOUT
} = constants.MESSAGES.USER;


export default class UserController {

    //create user
    async createUser(req: Request, res: Response) {

        const data = req.body;
        const email = data.email;
        //checks if another user with email exists
        if (await findByEmail(email)) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                message: DUPLICATE_ERROR,
                success: false
            });
        }

        //create a user if the email doesn't exist
        const createdUser = await createUser(data);
        const token = generateAuthToken(createdUser as any);
        res.cookie("token", token, { 
            httpOnly: true, 
            maxAge: constants.MAXAGE * 1000 
        });
        return res.status(201)
            .send({
                message: CREATED,
                success: true,
                data: createdUser
            });
    }

    async getUsers(req: Request, res: Response) {
        const users = await getAllUsers();
        return res.status(200).send({
          success: true,
          message: FETCHEDALL,
          data: users
        });
    }

    async getUserById(req: Request, res: Response) {
        const user = await findById(req.params.id);
    
        if (!user) {
          return res.status(404).send({
            success: false,
            message: INVALID_ID_ERROR
          });
        }

        return res.status(200).send({
          success: true,
          message: FETCHED,
          data: user
        });
    }

    async editUser(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body;
        if(!(await findById(id))) {
            return res.status(404).json({
                message: INVALID_ID_ERROR,
                success: false
            })
        }
        // Fetching existing user email
        if(data.email){
            const existingRoomEmail  = await findByEmail(data.email)
            if(existingRoomEmail){
                if(existingRoomEmail._id.toString() !== id){
                    return res.status(403).json({
                        success: false,
                        message: DUPLICATE_ERROR
                    })
                }
            }
        }
        const updatedUser = await editUserById(id, data)
        return res.status(200).json({
            success: true,
            message: UPDATED,
            data: updatedUser
        })
    }
    
    async deleteUserById(req: Request, res: Response) {
        const id = req.params.id;
        //check to see if a roomtype with id exists
        const userToDelete = await findById(id);
        //deletes the roomtype if the id exist
        if(userToDelete) {
            const userDeleted = await deleteUserById(id);
            return res.status(201).send({
                message: DELETED,
                success: true,
                data: userDeleted
            });
        }
        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: INVALID_ID_ERROR
            });   
    }
    
    async login(req: Request, res: Response) {
        const user = await findByEmailWithP(req.body.email);
        if (!user) {
            return res.status(400)
            .send({ 
                success: false, 
                message: INVALID_EMAIL_ERROR 
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400)
            .send({ 
                success: false, 
                message: INVALID_PASSWORD_ERROR 
            });
        }
        const token = generateAuthToken(user as any);
        res.cookie("token", token, { 
            httpOnly: true, 
            maxAge: constants.MAXAGE * 1000 
        });
        return res.header('token', token).status(200).send({
            success: true,
            message: LOGIN,
            data: { user, token }
        });
    }

    async logout(req: Request, res: Response) {
        res.cookie("token", '', {
            httpOnly: true, maxAge: 1
        });
        return res.status(200).send({
            success: true,
            message: LOGGEDOUT
        });
    }
}