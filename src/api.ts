import { Express } from "./utils/express"
import helmet from "helmet"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import compression from "compression"
import expressWinston from "express-winston"
import mongoose from "mongoose"
import winston from "winston"
import cors from "cors"
import * as errorHandler from "./utils/errorHandler"
import { OrderRoute } from "./routes/order.routes"
import { UserRoute } from "./routes/user.routes"

const { index } = require("./routes/index.route")

const path = `${__dirname}/../.env.${process.env.NODE_ENV}`

export default class Api extends Express {
    [x: string]: any

    public constructor () {
        super()
        this.userRoutes = new UserRoute()
        this.orderRoutes = new OrderRoute()
        dotenv.config({ path: path })
        this.mongoUrl = `mongodb://${process.env.MONGODB_URL_PORT}/${process.env.MONGODB_DATABASE}`
        this.mongoUser = `${process.env.MONGODB_USER}`
        this.mongoPass = `${process.env.MONGODB_PASS}`
        this.use(helmet())
        this.use(compression())
        this.use(bodyParser.json())
        this.use(bodyParser.urlencoded({ extended: true }))
        this.use(cors())
        this.use("", index)
        this.userRoutes.routes(this)
        this.orderRoutes.routes(this)

        this.mongoSetup()

        this.app.use(
            expressWinston.errorLogger({
                transports: [new winston.transports.Console()],
            })
        )
        this.app.use(errorHandler.logging)
        this.app.use(errorHandler.clientErrorHandler)
        this.app.use(errorHandler.errorHandler)
    }

    private mongoSetup (): void {
        let options

        if (process.env.NODE_ENV === "production") {
            options = {
                useNewUrlParser: true,
            }
        } else {
            options = {
                user: this.mongoUser,
                pass: this.mongoPass,
                useNewUrlParser: true,
            }
        }

        mongoose.connect(this.mongoUrl, options)
    }
}
