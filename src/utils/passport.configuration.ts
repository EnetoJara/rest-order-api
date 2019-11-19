const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")

export class PassportConfig {
    constructor () {
        passport.use(
            new Strategy(
                {
                    secretOrKey: "top_secret",
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                },
                (token: any, done: any) => {
                    console.log("token: ", token)
                    try {
                        done(null, token.user)
                    } catch (error) {
                        done(error)
                    }
                }
            )
        )
    }
}
