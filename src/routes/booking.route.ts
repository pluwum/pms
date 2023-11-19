import { BookingController } from "../controller/booking.controller"

export const BookingRoutes = [
    {
        method: "post",
        route: "/bookings",
        controller: BookingController,
        action: "create",
        authenticate: false,
    },
]
