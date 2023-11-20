import { AppDataSource } from "../../data-source"
import { OperationFailedException } from "../exceptions"
import { ParkingSlot } from "./parking-slot.entity"

export class ParkingSlotService {
    private parkingSlotRepository = AppDataSource.getRepository(ParkingSlot)
    async createParkingSlot(parkingSlot): Promise<ParkingSlot> {
        const newParkingSlot = Object.assign(new ParkingSlot(), parkingSlot)

        try {
            return await this.parkingSlotRepository.save(newParkingSlot)
        } catch (error) {
            throw new OperationFailedException({
                message: error.message,
                statusCode: 500,
            })
        }
    }
}
