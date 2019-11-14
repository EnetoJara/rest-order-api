import { Express } from "./config/express";
import helmet from "helmet";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { index } from "./routes/index.route";

export class Api extends Express {
    [x: string]: any;

    constructor () {
        super();
        this.use(helmet());
        this.use(compression());
        this.use(bodyParser.json());
        this.use(bodyParser.urlencoded({ extended: true }));
        this.use(cors());
        this.use("/index", index);
    }
}
