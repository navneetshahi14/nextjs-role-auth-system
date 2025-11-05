/// <reference path="../types/express/index.d.ts" />
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";

// interface Decoded {
//   id: string;
//   role: string;
// }

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(404).json({ message: "Token is required" });

  try {
    const decoded = await verifyToken(token);

    if (typeof decoded === "string" || !decoded || !("role" in decoded)) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.user = decoded;
    next();
  } catch (err: any) {
    console.log(err.message);
    return res
      .status(400)
      .json({ message: "Something went wrong with your authorization" });
  }
};
