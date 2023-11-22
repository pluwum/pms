import { Request } from "express"
import { ParkingSlotStatus } from "./parking-slot.entity"
import { plainToClass } from "class-transformer"
import { CreateParkingSlotDTO } from "./dto/createParkingSlot.dto"
import { validate } from "class-validator"
import { formatValidationErrors } from "../../utils"
import { ParkingSlotService } from "./parking-slot.service"
import { UpdateParkingSlotDTO } from "./dto/updateParkingSlot.dto"

export class ParkingSlotController {
    private parkingSlotService = new ParkingSlotService()

    async all() {
        const parkingSlots = await this.parkingSlotService.getParkingSlots()

        return {
            data: parkingSlots,
            statusCode: 200,
        }
    }

    async one(request: Request) {
        const id = request.params.id

        try {
            const parkingSlot =
                await this.parkingSlotService.getParkingSlotById(id)
            return { data: parkingSlot, statusCode: 200 }
        } catch (error) {
            return { message: error.message, statusCode: error.statusCode }
        }
    }

    async create(request: Request) {
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

    async remove(request: Request) {
        const id = request.params.id

        try {
            await this.parkingSlotService.deleteParkingSlot(id)
            return {
                message: "Parking slot has been removed",
                statusCode: 200,
            }
        } catch (error) {
            return { message: error.message, statusCode: error.statusCode }
        }
    }

    async update(request: Request) {
        const id = request.params.id

        const parkingSlotDto = plainToClass(UpdateParkingSlotDTO, request.body)
        const errors = await validate(parkingSlotDto)

        if (errors.length > 0) {
            return { message: formatValidationErrors(errors), statusCode: 400 }
        }

        try {
            const parkingSlot = await this.parkingSlotService.updateParkingSlot(
                id,
                parkingSlotDto
            )

            return {
                data: parkingSlot,
                statusCode: 200,
            }
        } catch (error) {
            return { message: error.message, statusCode: error.statusCode }
        }
    }
}
