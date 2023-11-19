import { UserRole } from "./api/user/user.entity"

export type ControllerRoute = {
    method: string
    route: string
    controller: any
    action: string
    authenticate: boolean
    permissions: UserRole[]
}
