import { UserController } from "../controller/user.controller"

export const UserRoutes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all",
        authenticate: false,
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one",
        authenticate: false,
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "create",
        authenticate: false,
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove",
        authenticate: false,
    },
]
