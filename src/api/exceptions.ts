export class BadInputException extends Error {
    public statusCode: number

    constructor({ message, statusCode }) {
        super(message)
        this.statusCode = statusCode
        this.name = "BadInputException"
    }
}

export class OperationFailedException extends Error {
    public statusCode: number

    constructor({ message, statusCode }) {
        super(message)
        this.statusCode = statusCode
        this.name = "OperationFailedException"
    }
}

export class NotFoundException extends Error {
    public statusCode: number

    constructor({ message, statusCode }) {
        super(message)
        this.statusCode = statusCode
        this.name = "NotFoundException"
    }
}
