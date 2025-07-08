const express = require("express");
const router = express.Router();
const controller = require("../controllers/templates.controller");

router.get("/", controller.getAllTemplates);
router.post("/", controller.createTemplate);
router.patch("/:template_id", controller.updateTemplate);
router.delete("/:template_id", controller.deleteTemplate);

module.exports = router;