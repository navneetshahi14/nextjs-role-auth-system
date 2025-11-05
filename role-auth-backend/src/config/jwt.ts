import jwt, { JwtPayload } from 'jsonwebtoken'
const JWT_SECRET_KEY = "12345678abcdefghijklmnopqrstuvwxyz"


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
