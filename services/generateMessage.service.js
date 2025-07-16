const openai = require("../config/openaiClient");
const genAI = require("../config/geminiClient");

exports.generateOpenAiReply = async ({ lastMessage }) => {
    const prompt = `
You are an assistant helping a user manage business conversations professionally.

The user received the message:
"${lastMessage}"

Based on this, generate a helpful, professional reply.
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            { role: "user", content: prompt }
        ],
    });

    return completion.choices[0].message.content.trim();
};

exports.generateGeminiReply = async ({ lastMessage }) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a helpful assistant replying to business messages.

User received:
"${lastMessage}"

Reply with a professional response.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};
