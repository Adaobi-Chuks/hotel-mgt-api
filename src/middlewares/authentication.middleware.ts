import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import constants from "../config/constants.config";
import AuthRequest from "../interfaces/auth.interface";
import IUser from "../interfaces/user.interface";
const {TOKENERROR} = constants.MESSAGES.AUTH;

// check json web token exists & is verified
export default function authenticate(req: Request, res: Response, next: NextFunction){
    let token = req.cookies.token || req.header("token");
    if (!token) {
        return res.status(401)
            .send({
                success: false,
                message: TOKENERROR
            });
    } else {
        const user = jwt.verify(token, constants.SECRET) as Partial<IUser>;
        (req as AuthRequest).user = user;
        next();
    }
}