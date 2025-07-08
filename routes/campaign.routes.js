const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaign.controller");

router.get("/", campaignController.getAllCampaigns);
router.get("/:campaign_id", campaignController.getCampaign);
router.post("/:campaign_id/audience", campaignController.addProfileToCampaign);
router.post("/:campaign_id/audience/multiple", campaignController.addProfilesWithVars);
router.patch("/:campaign_id", campaignController.updateCampaign);

module.exports = router;