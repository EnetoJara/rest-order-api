import { Document, Model, model, Schema } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import { User } from "../types/models"

export interface UserModel extends User, Document {}

export const UserSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: { type: String, minlength: 6, required: true },
    phone: String,
    userStatus: Number,
    username: String,
})

UserSchema.plugin(uniqueValidator)

export const UserModel: Model<UserModel> = model<UserModel>("User", UserSchema)
