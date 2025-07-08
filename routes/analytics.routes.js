const express = require("express");
const router = express.Router();
const controller = require("../controllers/analytics.controller");

router.get("/recent-leads", controller.recentLeads);
router.get("/interactions", controller.interactions);

module.exports = router;