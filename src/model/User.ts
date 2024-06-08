import mongoose, { Schema, models, Document, Model, model } from "mongoose";
import { tree } from "next/dist/build/templates/app-page";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema = new Schema<Message>({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required!"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required!"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    required: true,
  },
  messages: [MessageSchema],
});

const UserModel = (models.User as Model<User>) || model<User>("User", UserSchema);

export default UserModel;
