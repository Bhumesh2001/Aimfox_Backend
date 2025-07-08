const express = require("express");
const router = express.Router();
const leadController = require("../controllers/lead.controller");

router.get("/:lead_id", leadController.getLead);
router.post("/:lead_id/labels/:label_id", leadController.addLabelToLead);
router.delete("/:lead_id/labels/:label_id", leadController.removeLabelFromLead);
router.post("/search", leadController.searchLeads);

module.exports = router;