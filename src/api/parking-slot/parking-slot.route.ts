import { type ControllerRoute } from "../types"
import { UserRole } from "../user/user.entity"
import { ParkingSlotController } from "./parking-slot.controller"

const permissions = [UserRole.ADMIN]

export const ParkingSlotRoutes: ControllerRoute[] = [
  {
    method: "get",
    route: "/parking-slots",
    controller: ParkingSlotController,
    action: "all",
    authenticate: true,
    permissions: [UserRole.STANDARD, UserRole.ADMIN],
  },
  {
    method: "get",
    route: "/parking-slots/:id",
    controller: ParkingSlotController,
    action: "one",
    authenticate: true,
    permissions: [UserRole.STANDARD, UserRole.ADMIN],
  },
  {
    method: "post",
    route: "/parking-slots",
    controller: ParkingSlotController,
    action: "create",
    authenticate: true,
    permissions,
  },
  {
    method: "delete",
    route: "/parking-slots/:id",
    controller: ParkingSlotController,
    action: "remove",
    authenticate: true,
    permissions,
  },
  {
    method: "patch",
    route: "/parking-slots/:id",
    controller: ParkingSlotController,
    action: "update",
    authenticate: true,
    permissions,
  },
]
