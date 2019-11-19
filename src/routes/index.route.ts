import { formatOutPut } from "./../utils/order.api.response"
import { getStatusText } from "http-status-codes"
import { OK } from "http-status-codes"
import { Request, Response, Router } from "express"

const index = Router()

index.route("/index").get((req: Request, res: Response) => {
    res.status(OK).send(getStatusText(OK))

    return formatOutPut(res, getStatusText(OK), OK)
})

export { index }
