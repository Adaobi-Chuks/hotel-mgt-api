import { NextFunction, Request, Response } from "express";
import AuthRequest from "../interfaces/auth.interface";

import constants from "../config/constants.config";


    export default function authorizeAdmin(req: Request, res: Response, next: NextFunction){
        if ((req as AuthRequest).user.role !== constants.ENUM.ADMIN) {
            return res.status(403)
                .send({
                    success: false, 
                    message: constants.MESSAGES.AUTH.DENIED
                })
        }
        next();
    }
