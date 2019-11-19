import { getStatusText, NOT_FOUND, CREATED, OK } from "http-status-codes"
import { logger } from "./../utils/logger"
import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import halson from "halson"
import jwt from "jsonwebtoken"
import { UserModel } from "../schemas/user.schema"
import { formatOutPut } from "../utils/order.api.response"
import { INTERNAL_SERVER_ERROR } from "http-status-codes"

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params

    logger.info(`[GET] [/users] ${username}`)

    return UserModel.findOne({ username: username }, (err, user) => {
        if (err !== null) {
            return formatOutPut(res, err, INTERNAL_SERVER_ERROR)
        }
        if (user === null) {
            logger.info(`[GET] [/users/:{username}] user with username ${username} not found`)
            return formatOutPut(res, getStatusText(NOT_FOUND), NOT_FOUND)
        }

        user = user.toJSON()
        user._id = user._id.toString()

        user = halson(user).addLink("self", `/users/${user._id}`)

        return formatOutPut(res, user, 200, "user")
    })
}

export const addUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser = new UserModel(req.body)

    logger.info(`[POST] [/users] ${newUser}`)

    newUser.password = bcrypt.hashSync(newUser.password, 10)

    newUser.save((error, user) => {
        if (error) {
            logger.info(
                `[POST] [/users] something went wrong when saveing a new user ${newUser.username} | ${error.message}`
            )
            return res.status(500).send(error)
        }
        user = halson(user.toJSON()).addLink("self", `/users/${user._id}`)
        return formatOutPut(res, user, CREATED, "user")
    })
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params

    logger.info(`[PATCH] [/users] ${username}`)

    UserModel.findOne({ username: username }, (err, user) => {
        if (!user) {
            logger.info(`[PATCH] [/users/:{username}] user with username ${username} not found`)
            return res.status(404).send()
        }

        user.username = req.body.username || user.username
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        user.phone = req.body.phone || user.phone
        user.userStatus = req.body.userStatus || user.userStatus

        return user.save(error => {
            res.status(204).send()
        })
    })
}

export const removeUser = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params

    logger.warn(`[DELETE] [/users] ${username}`)

    return UserModel.findOne({ username: username })
        .then((user: any) => {
            if (!user) {
                logger.info(`[DELETE] [/users/:{username}] user with username ${username} not found`)
                return res.status(404).send()
            }

            return user.remove()
        })
        .then(() => {
            return res.status(204).send()
        })
        .catch((error: Error) => next(error))
}

export const login = (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.query
    const { password } = req.query

    UserModel.findOne({ username: username }, (err, user) => {
        if (!user) {
            logger.info(`[GET] [/users/login] no user found with the username ${username}`)
            return res.status(404).send()
        }

        const validate = bcrypt.compareSync(password, user.password.valueOf())

        if (validate) {
            const body = { _id: user._id, email: user.email }

            const token = jwt.sign({ user: body }, "top_secret")

            res.status(OK).json({ token: token })
        } else {
            logger.info(`[GET] [/users/login] user not authorized ${username}`)
            res.status(401).send()
        }
    })
}
