const { generateOpenAiReply, generateGeminiReply } = require("../services/generateMessage.service");
const { cleanReplyText } = require("../utils/helper");

const { API_TYPE = "OPENAI" } = process.env;

exports.generateMessage = async (req, res) => {
    try {
        if (
            !req.body ||
            typeof req.body !== "object" ||
            Array.isArray(req.body) ||
            Object.keys(req.body).length === 0
        ) {
            return res.status(400).json({ error: "Valid object data is required!" });
        }

        const generator =
            API_TYPE.toUpperCase() === "GEMINI"
                ? generateGeminiReply
                : generateOpenAiReply;

        const rawReply = await generator(req.body);
        const cleanedReply = cleanReplyText(rawReply);

        return res.json({ reply: cleanedReply });
    } catch (err) {
        console.error("AI generation error:", err);
        return res.status(500).json({ error: "Failed to generate reply" });
    }
};
