const axios = require("axios");

const httpClient = axios.create({
    baseURL: process.env.AIMFOX_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.AIMFOX_API_KEY}`,
        "Content-Type": "application/json",
    },
});

module.exports = httpClient;
