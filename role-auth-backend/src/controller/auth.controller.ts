import { Request, Response } from "express";
import { compPass, hashPass } from "../config/passHashing";
import User from "../models/user.model";
import { generateToken, Payload } from "../config/jwt";

export const Register = async (req: Request, res: Response) => {
  try {
    console.log("Request Body",req)
    console.log("Body",req.body)
    const { name, email, password, role } = req.body;
    console.log(name,email,password,role)
    if (!name || !email || !password || !role) {
      return res.status(404).json({ message: "Please fill all the fields" });
    }


    const hashedPass = await hashPass(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      role,
    });

    const payload: Payload = {
      _id: newUser._id as string,
      role: newUser.role,
    };

    const token = await generateToken(payload);

    return res
      .status(201)
      .json({ token, message: "User created successfully" });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({ message: "Please fill all the fields" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User don't exist" });

    const passMatch = await compPass(password, user.password);
    if (!passMatch)
      return res.status(400).json({ message: "Wrong Credentials" });

    const payload: Payload = {
      _id: user._id as string,
      role: user.role,
    };

    const token = await generateToken(payload);

    res.status(200).json({ role:user.role,token, message: "Login successfully" });
  } catch (err: any) {
    console.log(err.message);
  }
};
