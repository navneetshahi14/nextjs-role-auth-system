import jwt, { JwtPayload } from 'jsonwebtoken'
import { ENV } from './ENV'
const JWT_SECRET_KEY = ENV.JWT_SECRET_KEY 


export interface Payload {
    _id:string
    role:string
}

export const generateToken = async(payload:Payload) => {
    return jwt.sign(payload,JWT_SECRET_KEY as string,{
        expiresIn:'7d'
    })
}


export const verifyToken = async(token:string) =>{
    const decoded = jwt.verify(token,JWT_SECRET_KEY as string) as JwtPayload
    return {_id:decoded._id,role:decoded.role}
}
