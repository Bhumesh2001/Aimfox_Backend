const express = require("express");
const router = express.Router();
const controller = require("../controllers/blacklist.controller");

router.get("/", controller.list);
router.post("/:urn", controller.add);
router.delete("/:urn", controller.remove);

module.exports = router;
