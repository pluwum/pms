import { BookingRoutes } from "./booking/booking.route"
import { ParkingSlotRoutes } from "./parking-slot/parking-slot.route"
import { UserRoutes } from "./user/user.route"

export default [...UserRoutes, ...ParkingSlotRoutes, ...BookingRoutes]
