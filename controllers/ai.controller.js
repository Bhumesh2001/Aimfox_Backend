const { generateOpenAiReply, generateGeminiReply } = require("../services/generateMessage.service");
const { cleanReplyText } = require("../utils/helper");

const { API_TYPE = "OPENAI" } = process.env;

exports.generateMessage = async (req, res) => {
    try {
        const { lastMessage } = req.body;
        if (!lastMessage || typeof lastMessage !== "string") {
            return res.status(400).json({ error: "Invalid or missing 'lastMessage'" });
        }

        const generator =
            API_TYPE.toUpperCase() === "GEMINI" ? generateGeminiReply : generateOpenAiReply;

        const rawReply = await generator({ lastMessage });
        const cleanedReply = cleanReplyText(rawReply);

        return res.json({ reply: cleanedReply });
    } catch (err) {
        console.error("AI generation error:", err);
        return res.status(500).json({ error: "Failed to generate reply" });
    }
};
