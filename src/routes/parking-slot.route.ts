import { ParkingSlotController } from "../controller/parking-slot.controller"

export const ParkingSlotRoutes = [
    {
        method: "get",
        route: "/parking-slots",
        controller: ParkingSlotController,
        action: "all",
        authenticate: false,
    },
    {
        method: "get",
        route: "/parking-slots/:id",
        controller: ParkingSlotController,
        action: "one",
        authenticate: false,
    },
    {
        method: "post",
        route: "/parking-slots",
        controller: ParkingSlotController,
        action: "create",
        authenticate: false,
    },
    {
        method: "delete",
        route: "/parking-slots/:id",
        controller: ParkingSlotController,
        action: "remove",
        authenticate: false,
    },
]
