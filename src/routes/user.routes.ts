import passport from "passport"
import * as userController from "../controllers/user.constroller"
import { PassportConfig } from "../utils/passport.configuration"
import { Application } from "express"

export class UserRoute extends PassportConfig {
    public routes (app: Application): void {
        app.route("/users").post(passport.authenticate("jwt", { session: false }), userController.addUser)
        app.route("/users/login").get(userController.login)
        app.route("/users/:username").patch(passport.authenticate("jwt", { session: false }), userController.updateUser)
        app.route("/users/:username").delete(
            passport.authenticate("jwt", { session: false }),
            userController.removeUser
        )
        app.route("/users/:username").get(passport.authenticate("jwt", { session: false }), userController.getUser)
    }
}
