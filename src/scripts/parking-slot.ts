import { AppDataSource } from "../data-source"
import { ParkingSlot, ParkingSlotStatus } from "../entity/parking-slot.entity"
import "reflect-metadata"
import { v4 as uuidv4 } from "uuid"

export const fakeParkingSlots: ParkingSlot[] = [
    {
        id: "4e52b5e2-8c7b-4d35-9b1f-9f6b1e1d5c3f",
        name: "East Wing #1",
        status: ParkingSlotStatus.ACTIVE,
        status_reason: null,
        createdAt: new Date(),
        createdBy: "userFromSession",
        updatedAt: new Date(),
        updatedBy: "userFromSession",
    },
    {
        id: "7a8b9c10-d5e6-4f78-89ab-cdef12345678",
        name: "East Wing #2",
        status: ParkingSlotStatus.ACTIVE,
        status_reason: null,
        createdAt: new Date(),
        createdBy: "userFromSession",
        updatedAt: new Date(),
        updatedBy: "userFromSession",
    },
]

export const singleParkingSlot: ParkingSlot = {
    id: uuidv4(),
    name: "East Wing #4",
    status: ParkingSlotStatus.ACTIVE,
    status_reason: null,
    createdAt: new Date(),
    createdBy: "userFromSession",
    updatedAt: new Date(),
    updatedBy: "userFromSession",
}

export const createParkingSlot = async (
    parkingSlot = singleParkingSlot
): Promise<ParkingSlot> => {
    return await AppDataSource.manager.save(
        AppDataSource.manager.create(ParkingSlot, parkingSlot)
    )
}

export const createManyParkingSlots = async (
    parkingSlots: Partial<ParkingSlot>[]
): Promise<void> => {
    try {
        await AppDataSource.manager.insert(ParkingSlot, parkingSlots)
    } catch (error) {
        console.error(error)
    }
}
