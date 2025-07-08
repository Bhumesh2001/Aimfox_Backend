const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");

router.get("/", accountController.listAccounts);
router.get("/:account_id/limits", accountController.getAccountLimits);
router.patch("/:account_id/limits", accountController.setAccountLimits);

module.exports = router;