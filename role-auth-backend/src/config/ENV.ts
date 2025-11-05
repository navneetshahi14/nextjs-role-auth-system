import dotenv from 'dotenv'
dotenv.config({quiet:true})

export const ENV = {
    MONGO_URI : process.env.MONGO_URI,
    PORTNO:process.env.PORTNO,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY
}
