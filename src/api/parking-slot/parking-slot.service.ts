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

    async deleteParkingSlot(parkingSlotId): Promise<void> {
        const parkingSlot = await this.parkingSlotRepository.findOne({
            where: { id: parkingSlotId },
        })

        if (!parkingSlot) {
            throw new OperationFailedException({
                message: "Parking slot is not found",
                statusCode: 404,
            })
        }

        try {
            await this.parkingSlotRepository.remove(parkingSlot)
        } catch (error) {
            throw new OperationFailedException({
                message: error.message,
                statusCode: 500,
            })
        }
    }

    async getParkingSlotById(parkingSlotId): Promise<ParkingSlot> {
        const parkingSlot = await this.parkingSlotRepository.findOne({
            where: { id: parkingSlotId },
        })

        if (!parkingSlot) {
            throw new OperationFailedException({
                message: "Parking slot is not found",
                statusCode: 404,
            })
        }

        return parkingSlot
    }
    async getParkingSlots(): Promise<ParkingSlot[]> {
        return await this.parkingSlotRepository.find()
    }
}
