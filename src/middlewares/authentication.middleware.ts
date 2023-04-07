import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import constants from "../config/constants.config";
import AuthRequest from "../interfaces/auth.interface";
import IUser from "../interfaces/user.interface";
import UserService from "../services/user.service";
const User = new UserService();
const {TOKENERROR, INVALIDTOKEN} = constants.MESSAGES.AUTH;

// check json web token exists & is verified
export default function authenticate(req: Request, res: Response, next: NextFunction){
    let token = req.cookies.token;
    if (!token) {
        return res.status(401)
            .send({
                success: false,
                message: TOKENERROR
            });
    }
    jwt.verify(token, constants.SECRET, async (err: any, decoded: any) => {
        if (err) {
            return res.status(401)
                .send({ 
                    success: false,
                    message: INVALIDTOKEN
                });
        } else {
            const user = await User.findById(decoded.id);
            if(!user) {
                return res.status(401)
                .send({
                    success: false,
                    message: constants.MESSAGES.USER.INVALID_ID_ERROR
                });
            }
            // Add the decoded token to the request object for future use
            (req as AuthRequest).user = decoded;
            next();
        }
    });
}