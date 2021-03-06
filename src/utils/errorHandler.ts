import { NextFunction, Request, Response } from "express"
const logger = require("./logger")

export const logging = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error(err)
    next(err)
}

export const clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void | Response => {
    if (req.xhr) {
        return res.status(500).send({ error: "Something failed!" })
    }
    return next(err)
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    return res.status(500).send({ error: err.message })
}
