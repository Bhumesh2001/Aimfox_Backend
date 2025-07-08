const express = require("express");
const router = express.Router();
const controller = require("../controllers/labels.controller");

router.get("/", controller.getAllLabels);
router.post("/", controller.createLabel);
router.patch("/:label_id", controller.updateLabel);
router.delete("/:label_id", controller.deleteLabel);

module.exports = router;