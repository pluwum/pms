import { UserRole } from "../entity/user.entity"

export type ControllerRoute = {
    method: string
    route: string
    controller: any
    action: string
    authenticate: boolean
    permissions: UserRole[]
}
