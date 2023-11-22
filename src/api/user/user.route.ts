import { type ControllerRoute } from "../types"
import { UserController } from "./user.controller"
import { UserRole } from "./user.entity"

const permissions = [UserRole.ADMIN]
export const UserRoutes: ControllerRoute[] = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    authenticate: false,
    permissions,
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    authenticate: false,
    permissions,
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "create",
    authenticate: false,
    permissions,
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    authenticate: false,
    permissions,
  },
]
