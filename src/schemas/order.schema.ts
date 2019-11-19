import { Document, Model, model, Schema } from "mongoose"
import { Order } from "../types/models"

export interface OrderModel extends Order, Document {}

export const OrderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: Number,
    shipDate: Date,
    status: { type: String, enum: ["PLACED", "APPROVED", "DELIVERED"] },
    complete: Boolean,
})

export const OrderModel: Model<OrderModel> = model<OrderModel>("Order", OrderSchema)
