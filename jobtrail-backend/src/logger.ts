import winston from "winston"

type ColorKeys = "info" | "debug" | "error" | "warning"

const colorOptions: Record<ColorKeys, string> = {
    info: "cyan",
    debug: "green",
    error: "red",
    warning: "yellow"
}


const isProduction = Bun.env.NODE_ENV === "production"

export const logger: winston.Logger = winston.createLogger({
    level: "debug",
    levels: winston.config.npm.levels,

    format: isProduction
        ? winston.format.json()
        : winston.format.combine(
            winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
            winston.format.json(),
            winston.format.colorize({ all: true, colors: colorOptions }),
        ),

    transports: [
        new winston.transports.Console()
    ],

    handleExceptions: true,
    handleRejections: true,
})