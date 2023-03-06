import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";

const validateRoomType:RequestHandler = function (req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .trim()
            .lowercase()
    });

    const {error, value} = schema.validate(req.body);

    if(error) {
        return res.status(403)
            .send({
                message: error.details[0].message,
                success: false
            });
    }
    next();
}
export default validateRoomType;