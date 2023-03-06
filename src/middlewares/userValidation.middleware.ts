import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";

const schemaReq = Joi.object({
    fullName: Joi.string().required().min(3).max(100).trim(),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(8).max(20),
    age: Joi.number().required().min(18),
    nationality: Joi.string().required().trim(),
    role: Joi.string().lowercase()
});

const schemaOpt = Joi.object({
    fullName: Joi.string().min(3).max(100).trim(),
    email: Joi.string().email().lowercase().trim(),
    password: Joi.string().min(8).max(20),
    age: Joi.number().min(18),
    nationality: Joi.string().trim(),
    role: Joi.string().lowercase()
});

const validateUserReq:RequestHandler = function (req: Request, res: Response, next: NextFunction) {
    const {error, value} = schemaReq.validate(req.body, {
        abortEarly: false
    });

    if(error) {
        let errorMessage: string[] = [];
        error.details.forEach(detail => {
            errorMessage.push(detail.message);
        });
        return res.status(403)
            .send({
                message: errorMessage,
                success: false
            });
    }
    next();
}

const validateUserOpt:RequestHandler = function (req: Request, res: Response, next: NextFunction) {
    const {error, value} = schemaOpt.validate(req.body, {
        abortEarly: false
    });

    if(error) {
        let errorMessage: string[] = [];
        error.details.forEach(detail => {
            errorMessage.push(detail.message);
        });
        return res.status(403)
            .send({
                message: errorMessage,
                success: false
            });
    }
    next();
}

export {validateUserReq, validateUserOpt};