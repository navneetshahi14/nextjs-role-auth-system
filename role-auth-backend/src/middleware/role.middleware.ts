import { NextFunction, Request, Response } from "express"

export const restrictTo = (...roles:string[]) =>{
    return (req:Request,res:Response,next:NextFunction) => {
        const user = req.user
        if(!roles.includes((user!).role)){
            return res.status(403).json({message:"Forbidden: Access denied"})
        }

        next();
    }

}