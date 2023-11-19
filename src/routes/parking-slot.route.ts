import { ParkingSlotController } from "../controller/parking-slot.controller"
import { UserRole } from "../entity/user.entity"
import { ControllerRoute } from "./types"

const permissions = [UserRole.ADMIN]

export const ParkingSlotRoutes: ControllerRoute[] = [
    {
        method: "get",
        route: "/parking-slots",
        controller: ParkingSlotController,
        action: "all",
        authenticate: false,
        permissions,
    },
    {
        method: "get",
        route: "/parking-slots/:id",
        controller: ParkingSlotController,
        action: "one",
        authenticate: false,
        permissions,
    },
    {
        method: "post",
        route: "/parking-slots",
        controller: ParkingSlotController,
        action: "create",
        authenticate: false,
        permissions,
    },
    {
        method: "delete",
        route: "/parking-slots/:id",
        controller: ParkingSlotController,
        action: "remove",
        authenticate: false,
        permissions,
    },
    {
        method: "patch",
        route: "/parking-slots/:id",
        controller: ParkingSlotController,
        action: "update",
        authenticate: false,
        permissions,
    },
]
