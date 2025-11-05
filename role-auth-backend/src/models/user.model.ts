import mongoose, { Model, Schema, Document, SchemaType } from "mongoose";

export type Role = "client" | "Hr" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  contacted: mongoose.Types.ObjectId[];
  createdAt: true;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["client", "Hr", "admin"],
      default: "client",
    },
    contacted: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
