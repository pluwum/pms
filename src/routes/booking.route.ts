import { BookingController } from "../controller/booking.controller"

export const BookingRoutes = [
    {
        method: "post",
        route: "/bookings",
        controller: BookingController,
        action: "create",
        authenticate: false,
    },

    {
        method: "get",
        route: "/bookings",
        controller: BookingController,
        action: "all",
        authenticate: false,
    },

    {
        method: "get",
        route: "/bookings/:id",
        controller: BookingController,
        action: "one",
        authenticate: false,
    },
    {
        method: "delete",
        route: "/bookings/:id",
        controller: BookingController,
        action: "remove",
        authenticate: false,
    },
]
