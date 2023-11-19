import { BookingController } from "./booking.controller"
import { UserRole } from "../user/user.entity"
import { ControllerRoute } from "../../types"

const permissions = [UserRole.STANDARD, UserRole.ADMIN]
export const BookingRoutes: ControllerRoute[] = [
    {
        method: "post",
        route: "/bookings",
        controller: BookingController,
        action: "create",
        authenticate: true,
        permissions,
    },
    {
        method: "get",
        route: "/bookings",
        controller: BookingController,
        action: "all",
        authenticate: true,
        permissions,
    },
    {
        method: "get",
        route: "/bookings/:id",
        controller: BookingController,
        action: "one",
        authenticate: true,
        permissions,
    },
    {
        method: "delete",
        route: "/bookings/:id",
        controller: BookingController,
        action: "remove",
        authenticate: true,
        permissions,
    },
    {
        method: "patch",
        route: "/bookings/:id",
        controller: BookingController,
        action: "update",
        authenticate: true,
        permissions,
    },
]
