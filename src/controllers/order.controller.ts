import { logger } from "./../utils/logger"
import { NextFunction, Request, Response } from "express"
import halson from "halson"
import { groupBy } from "lodash"
import { OrderModel } from "../schemas/order.schema"
import { UserModel } from "../schemas/user.schema"
import { formatOutPut } from "../utils/order.api.response"

export const getOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    logger.info(`[GET] [/store/orders/] ${id}`)

    OrderModel.findById(id, (err, order) => {
        if (!order) {
            logger.info(`[GET] [/store/orders/:{orderId}] Order ${id} not found.`)
            return next(new Error(`Order ${id} not found.`))
        }
        order = halson(order.toJSON()).addLink("self", `/store/orders/${order.id}`)
        return formatOutPut(res, order, 200, "order")
    })
}

export const getAllOrders = (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query.limit) || 0
    const offset = Number(req.query.offset) || 0

    logger.info("[GET] [/store/orders/]")

    OrderModel.find({}, null, { skip: offset, limit: limit }).then(orders => {
        if (orders) {
            orders = orders.map(order => {
                return halson(order.toJSON())
                    .addLink("self", `/store/orders/${order.id}`)
                    .addLink("user", {
                        href: `/users/${order.userId}`,
                    })
            })
        }
        return formatOutPut(res, orders, 200, "order")
    })
}

export const addOrder = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body

    logger.info(`[POST] [/store/orders/] ${userId}`)

    UserModel.findById(userId, (err, user) => {
        if (!user) {
            logger.info(`[POST] [/store/orders/] There is no user with the userId ${userId}`)
            throw new Error(`There is no user with the userId ${userId}`)
        }

        const newOrder = new OrderModel(req.body)

        logger.info(`[POST] [/store/orders/] ${newOrder}`)

        newOrder.save((error, order) => {
            order = halson(order.toJSON())
                .addLink("self", `/store/orders/${order._id}`)
                .addLink("user", {
                    href: `/users/${order.userId}`,
                })

            return formatOutPut(res, order, 201, "order")
        })
    })
}

export const removeOrder = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    logger.warn(`[DELETE] [/store/orders/] ${id}`)

    OrderModel.findById(id, (err, order) => {
        if (!order) {
            logger.warn(`[DELETE] [/store/orders/:{orderId}] Order id ${id} not found`)
            return res.status(404).send()
        }
        order.remove(error => {
            return res.status(204).send()
        })
    })
}

export const getInventory = (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.query

    logger.info(`[GET] [/store/inventory/] ${status}`)

    OrderModel.find({ status: status }, (err, orders) => {
        const myOrders = groupBy(orders, "userId")
        return formatOutPut(res, myOrders, 200, "inventory")
    })
}
