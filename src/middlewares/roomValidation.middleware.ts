import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";

const schemaReq = Joi.object({
    name: Joi.string().required().lowercase().trim(),
    roomType: Joi.string().regex(/^[0-9a-fA-F]{24}$/).trim().required(),
    price: Joi.number().required(),
    floor: Joi.number().required(),
    capacity: Joi.number().required(),
    amenities: Joi.array().items(Joi.string()),
    booked: Joi.boolean().default(false)
});

const schemaOpt = Joi.object({
    name: Joi.string().lowercase().trim(),
    roomType: Joi.string().regex(/^[0-9a-fA-F]{24}$/).trim(),
    price: Joi.number(),
    floor: Joi.number(),
    capacity: Joi.number(),
    amenities: Joi.array().items(Joi.string()),
    booked: Joi.boolean().default(false)
});


const validateRoomReq:RequestHandler = function (req: Request, res: Response, next: NextFunction) {
    
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
                message: error.details[0].message,
                success: false
            });
    }
    next();
}

const validateRoomOpt:RequestHandler = function (req: Request, res: Response, next: NextFunction) {
    
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
                message: error.details[0].message,
                success: false
            });
    }
    next();
}
export {validateRoomReq, validateRoomOpt};