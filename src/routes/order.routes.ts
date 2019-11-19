import * as passport from "passport"
import * as orderController from "../controllers/order.controller"
import { PassportConfig } from "../utils/passport.configuration"

export class OrderRoute extends PassportConfig {
    public routes (app: any): void {
        app.route("/store/inventory").get(
            passport.authenticate("jwt", { session: false }),
            orderController.getInventory
        )
        app.route("/store/orders").post(passport.authenticate("jwt", { session: false }), orderController.addOrder)
        app.route("/store/orders").get(passport.authenticate("jwt", { session: false }), orderController.getAllOrders)
        app.route("/store/orders/:id").get(passport.authenticate("jwt", { session: false }), orderController.getOrder)
        app.route("/store/orders/:id").delete(
            passport.authenticate("jwt", { session: false }),
            orderController.removeOrder
        )
    }
}
