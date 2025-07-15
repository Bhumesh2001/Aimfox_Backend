const logger = require("../utils/logger");

const logRequestResponse = (req, res, next) => {
    const start = Date.now();
    const { method, originalUrl, headers, body } = req;

    logger.info(`📥 Incoming Request: ${method} ${originalUrl}`);
    // logger.info(`📦 Headers: ${JSON.stringify(headers)}`);
    // if (method !== "GET") {
    //     logger.info(`📝 Body: ${JSON.stringify(body)}`);
    // }

    // Wrap res.send to capture outgoing response
    const originalSend = res.send;
    res.send = function (bodyOut) {
        const duration = Date.now() - start;

        logger.info(`📤 Outgoing Response: ${method} ${originalUrl}`);
        // logger.info(`✅ Status: ${res.statusCode}`);
        // logger.info(`⏱️ Duration: ${duration}ms`);
        // logger.info(`📤 Response Body: ${bodyOut}`);

        res.send = originalSend;
        return res.send(bodyOut);
    };

    next();
};

module.exports = logRequestResponse;
