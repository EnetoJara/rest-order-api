import { Order, OrderStatus } from "models"

export class OrderDto implements Order {
    userId: number
    quantity: number
    shipDate: Date
    status: OrderStatus
    complete: boolean

    constructor (order: Order) {
        this.userId = order.userId || -1
        this.quantity = order.quantity || -1
        this.shipDate = order.shipDate || new Date()
        this.status = order.status || OrderStatus.Placed
        this.complete = order.complete || false
    }
}
