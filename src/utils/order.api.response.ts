import { Response } from "express"
const { NOT_ACCEPTABLE, getStatusText } = require("http-status-codes")
const js2xmlparser = require("js2xmlparser")
const { applicationJson, applicationXml } = require("./constants")

export const formatOutPut = (res: Response, data: any, statusCode: number, rootElement = "") => {
    return res.format({
        json: () => {
            res.type(applicationJson)
            res.status(statusCode).send(data)
        },
        xml: () => {
            res.type(applicationXml)
            res.status(statusCode).send(js2xmlparser.parse(rootElement, data))
        },
        default: () => {
            res.status(NOT_ACCEPTABLE).send(getStatusText(NOT_ACCEPTABLE))
        },
    })
}
