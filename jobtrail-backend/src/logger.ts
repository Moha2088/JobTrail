import winston from "winston"

type ColorKeys = "info" | "debug"

const colorOptions: Record<ColorKeys, string> = {
    info: "blue",
    debug: "green"
}


export const logger: winston.Logger = winston.createLogger({
    level: "debug",

    format: winston.format.combine(
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true, colors: colorOptions }),
    ),

    transports: [
        new winston.transports.Console()
    ],

    handleExceptions: true,
    handleRejections: true,
})