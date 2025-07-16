const express = require("express");
const router = express.Router();
const { generateMessage } = require("../controllers/ai.controller");

router.post("/", generateMessage);

module.exports = router;
