import { Elysia } from "elysia"
import { StatusCodes } from "http-status-codes"


export const handleNotFoundError = new Elysia()
    .onError({ as: "global" }, ({ code, status, set, path }) => {
        if(code === "NOT_FOUND") {
            set.status = StatusCodes.NOT_FOUND

            return {
                code,
                status: StatusCodes.NOT_FOUND,
                message: `Path: ${path} not found!`
            }
        }
    })