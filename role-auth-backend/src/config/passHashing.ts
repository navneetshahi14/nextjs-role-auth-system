import bcrypt from "bcryptjs";

export const hashPass = async(password:string) =>{
    return bcrypt.hash(password,10);
}


export const compPass = async(pass:string,userPass:string)=> {
    return bcrypt.compare(pass,userPass)
}