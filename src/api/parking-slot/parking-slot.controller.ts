import { AppDataSource } from "../../data-source"
import { NextFunction, Request, Response } from "express"
import { ParkingSlot, ParkingSlotStatus } from "./parking-slot.entity"
import { plainToClass } from "class-transformer"
import { CreateParkingSlotDTO } from "./dto/createParkingSlot.dto"
import { validate } from "class-validator"
import { formatValidationErrors } from "../../utils"
import { ParkingSlotService } from "./parking-slot.service"

export class ParkingSlotController {
    private parkingSlotRepository = AppDataSource.getRepository(ParkingSlot)
    private parkingSlotService = new ParkingSlotService()

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

    async create(request: Request, response: Response, next: NextFunction) {
        const parkingSlotDto = plainToClass(CreateParkingSlotDTO, request.body)

        const errors = await validate(parkingSlotDto)

        if (errors.length > 0) {
            return { message: formatValidationErrors(errors), statusCode: 400 }
        }

        try {
            const parkingSlot = await this.parkingSlotService.createParkingSlot(
                {
                    ...parkingSlotDto,
                    status: parkingSlotDto.status || ParkingSlotStatus.ACTIVE,
                    createdBy: request.user.id,
                    updatedBy: request.user.id,
                }
            )

            return {
                data: parkingSlot,
                statusCode: 201,
            }
        } catch (error) {
            return { message: error.message, statusCode: error.statusCode }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        let parkingSlotToRemove = await this.parkingSlotRepository.findOneBy({
            id,
        })

        if (!parkingSlotToRemove) {
            return {
                message: "this parking slot does not exist",
                statusCode: 404,
            }
        }

        await this.parkingSlotRepository.remove(parkingSlotToRemove)

        return {
            message: "parking slot has been removed",
            statusCode: 200,
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const parkingSlot = await this.parkingSlotRepository.findOne({
            where: { id },
        })

        if (!parkingSlot) {
            return { statusCode: 404, message: "Parking slot not found" }
        }

        const updates = request.body

        this.parkingSlotRepository.merge(parkingSlot, updates)

        try {
            const newParkingSlot = await this.parkingSlotRepository.save(
                parkingSlot
            )
            return {
                data: newParkingSlot,
                statusCode: 200,
            }
        } catch (error) {
            return { message: error.message, statusCode: 500 }
        }
    }
}
