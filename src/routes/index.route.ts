import { Request, Response, Router } from "express";

const index = Router();

index.route("").get((req: Request, res: Response) => {
    res.status(200).send({ status: "success" });
});

export { index };
