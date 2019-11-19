import { User } from "models"

exports.UserDto = class UserDto implements User {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    userStatus: number

    constructor (user: User) {
        this.username = user.username || ""
        this.firstName = user.firstName || ""
        this.lastName = user.lastName || ""
        this.email = user.email || ""
        this.password = user.password || ""
        this.phone = user.phone || ""
        this.userStatus = user.userStatus || -1
    }
}
