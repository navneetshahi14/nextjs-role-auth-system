import { Request, Response } from "express";
import User, {IUser} from "../models/user.model";
import mongoose from 'mongoose'


export const getAllHrs = async(req:Request,res:Response) =>{
    try{

        const hrs = await User.find({
            role:"Hr"
        }).select("-password")

        res.json(hrs)

    }catch(err:any){
        console.log(err.message)
    }
}


export const contactHr = async(req:Request,res:Response) =>{
    try{
        
        const clientId = req.user?._id
        const { hrId } = req.body

        const client = await User.findById(clientId)
        const hr = await User.findById(hrId)

        if(!hr || hr.role.toLowerCase() !== "hr"){
            return res.status(404).json({message:"HR not found"})
        }

        if(!client) {
            return res.status(404).json({message:"Client not found"})
        }

        client.contacted = client.contacted || []
        hr.contacted = hr.contacted || []

        const hrObjectId = hr._id as mongoose.Types.ObjectId
        const clientObjectId = client._id as mongoose.Types.ObjectId

        if(!client.contacted.some((id)=>id.equals(hrObjectId)))
        {
            client.contacted.push(hrObjectId)
        }

        if(!hr.contacted.some((id) => id.equals(clientObjectId)))
        {
            hr.contacted.push(clientObjectId)
        }

        await client.save()
        await hr.save()

        res.json({message:"Contact estaablished successfully"})

    }catch(err:any){
        console.log(err.message)
    }
}


export const getMyClients = async(req:Request,res:Response) =>{
    try {
        const hrId = req.user?._id
        const hr = await User.findById(hrId).populate("contacted","-password")

        if(!hr) return res.status(404).json({message:"HR not found"})

        res.json(hr.contacted || [])
    } catch (error:any) {
        console.log(error.message)
    }
}

export const getAllUsers = async(req:Request,res:Response) =>{
    try {
        const users = await User.find().select("-password").populate("contacted","name email role")

        res.json(users)
    } catch (error:any) {
        res.status(500).json({message:"Error fetching users",error})
    }

}

