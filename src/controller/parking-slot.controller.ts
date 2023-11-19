import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { ParkingSlot } from "../entity/parking-slot.entity"

export class ParkingSlotController {
    private parkingSlotRepository = AppDataSource.getRepository(ParkingSlot)

    async all(request: Request, response: Response, next: NextFunction) {
        const parkingSlot = await this.parkingSlotRepository.find()

        return {
            data: parkingSlot,
            statusCode: 200,
        }
    }
}
