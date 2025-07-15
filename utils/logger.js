const winston = require("winston");

const isVercel = process.env.VERCEL === "1";

const transports = [
    new winston.transports.Console(), // Always keep this
];

// Only add file transports locally
if (!isVercel) {
    const path = require("path");
    transports.push(
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/error.log"),
            level: "error",
        }),
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/combined.log"),
        })
    );
};

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports,
});

module.exports = logger;
