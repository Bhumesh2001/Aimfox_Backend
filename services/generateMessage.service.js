const openai = require("../config/openaiClient");
const genAI = require("../config/geminiClient");

const prompt = `
You are a professional communication assistant. I will give you:

A list of past messages in a conversation as JSON

Some details about our company

Some details about the person replying and user we are talking too

Your task is to generate a natural, professional, and empathetic human reply that continues the conversation appropriately. You should:

Maintain the tone and context of the conversation so far

Respond as if you are the actual person (whose details are provided)

Incorporate company information only if relevant to the message (don’t force it)

Avoid sounding like an AI. Keep the reply concise, clear, and warm.
`;

exports.generateOpenAiReply = async (lastMessage) => {    
    const inputPayload = {
        conversation: lastMessage.conversation,
        company_details: lastMessage.company_details,
        replying_person: lastMessage.replying_person,
        user_details: lastMessage.user_details
    };

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            {
                role: "user",
                content: `${prompt}\n\n${JSON.stringify(inputPayload, null, 2)}`
            }
        ],
    });

    return completion.choices[0].message.content.trim();
};

exports.generateGeminiReply = async (lastMessage) => {    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const inputPayload = {
        conversation: lastMessage.conversation,
        company_details: lastMessage.company_details,
        replying_person: lastMessage.replying_person,
        user_details: lastMessage.user_details
    };

    const result = await model.generateContent(`${prompt}\n\n${JSON.stringify(inputPayload, null, 2)}`);
    const response = await result.response;
    return response.text();
};
