import { type UserRole } from "./user/user.entity"

export interface ControllerRoute {
  method: string
  route: string
  controller: any
  action: string
  authenticate: boolean
  permissions: UserRole[]
}

export interface RouteHandlerResponse {
  message?: any
  data?: any
  statusCode?: number
}
