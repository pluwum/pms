import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { ParkingSlot, ParkingSlotStatus } from "../entity/parking-slot.entity"

export class ParkingSlotController {
    private parkingSlotRepository = AppDataSource.getRepository(ParkingSlot)

    async all(request: Request, response: Response, next: NextFunction) {
        const parkingSlot = await this.parkingSlotRepository.find()

        return {
            data: parkingSlot,
            statusCode: 200,
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const parkingSlot = await this.parkingSlotRepository.findOne({
            where: { id },
        })

        if (!parkingSlot) {
            return { statusCode: 404, message: "Parking slot not found" }
        }
        return { data: parkingSlot, statusCode: 200 }
    }
}
