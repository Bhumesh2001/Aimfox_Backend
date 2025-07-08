const express = require("express");
const router = express.Router();
const controller = require("../controllers/messages.controller");

router.get("/conversations", controller.getAllConversations);
router.get("/:account_id/conversations/:conversation_urn", controller.getConversation);
router.get("/:account_id/leads/:lead_id/conversation", controller.getLeadConversation);
router.post("/:account_id/conversations", controller.startConversation);
router.post("/:account_id/conversations/:conversation_urn", controller.sendMessage);
router.post("/:account_id/conversations/:conversation_urn/mark-as-read", controller.markAsRead);
router.post("/:account_id/conversations/:conversation_urn/messages/:message_id/react", controller.reactToMessage);
router.patch("/:account_id/conversations/:conversation_urn/messages/:message_id", controller.editMessage);
router.delete("/:account_id/conversations/:conversation_urn/messages/:message_id", controller.deleteMessage);

module.exports = router;