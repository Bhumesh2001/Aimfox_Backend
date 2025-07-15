const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.getAllConversations = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getAllConversations');
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get("/conversations");

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getConversation = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getConversation', req.query, req.params);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const { account_id, conversation_urn } = req.params;
        const data = await aimfox.get(`/accounts/${parseInt(account_id)}/conversations/${conversation_urn}`);

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLeadConversation = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getLeadConversation', req.query, req.params);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const { account_id, lead_id } = req.params;
        const data = await aimfox.get(`/accounts/${parseInt(account_id)}/leads/${lead_id}/conversation`);

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.startConversation = async (req, res) => {
    try {
        const { account_id } = req.params;
        const data = await aimfox.post(`/accounts/${parseInt(account_id)}/conversations`, req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { account_id, conversation_urn } = req.params;
        const data = await aimfox.post(`/accounts/${parseInt(account_id)}/conversations/${conversation_urn}`, req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { account_id, conversation_urn } = req.params;
        const data = await aimfox.post(`/accounts/${parseInt(account_id)}/conversations/${conversation_urn}/mark-as-read`);
        clearSingleCache('getAllConversations');
        clearSingleCache('getConversation', req.query, req.params);
        clearSingleCache('getLeadConversation', req.query, req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.reactToMessage = async (req, res) => {
    try {
        const { account_id, conversation_urn, message_id } = req.params;
        const data = await aimfox.post(`/accounts/${parseInt(account_id)}/conversations/${conversation_urn}/messages/${message_id}/react`, req.body);
        clearSingleCache('getAllConversations');
        clearSingleCache('getConversation', req.query, req.params);
        clearSingleCache('getLeadConversation', req.query, req.params);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.editMessage = async (req, res) => {
    try {
        const { account_id, conversation_urn, message_id } = req.params;
        const data = await aimfox.patch(`/accounts/${parseInt(account_id)}/conversations/${conversation_urn}/messages/${message_id}`, req.body);
        clearSingleCache('getAllConversations');
        clearSingleCache('getConversation', req.query, req.params);
        clearSingleCache('getLeadConversation', req.query, req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { account_id, conversation_urn, message_id } = req.params;
        const data = await aimfox.delete(`/accounts/${parseInt(account_id)}/conversations/${conversation_urn}/messages/${message_id}`);
        clearSingleCache('getAllConversations');
        clearSingleCache('getConversation', req.query, req.params);
        clearSingleCache('getLeadConversation', req.query, req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
