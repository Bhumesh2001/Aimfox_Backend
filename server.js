const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Handle unhandled errors globally
process.on("unhandledRejection", (err) => {
    logger.error(`💥 Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
    logger.error(`🔥 Uncaught Exception: ${err.message}`);
    process.exit(1);
});

module.exports = app;
