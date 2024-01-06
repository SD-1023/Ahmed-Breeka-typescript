import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const bookScheme = joi.object({
    name:   joi.string().required(),
    author: joi.string().required(),
    Isbn:   joi.string().required()
});

export const validateBookData = (req: Request, res: Response, next: NextFunction) => {
    let {error, value}= bookScheme.validate(req.body);
    
    if(error){
        throw error;
        console.log(value);
    }
    else {
        next();
    }
}