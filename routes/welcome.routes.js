const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "🎉 Welcome to Aimfox Backend API!",
        status: "API Running Successfully",
        version: "v1"
    });
});

module.exports = router;
