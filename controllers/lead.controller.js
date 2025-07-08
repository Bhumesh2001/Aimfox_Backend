const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.getLead = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getLead', req.query, req.params);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get(`/leads/${parseInt(req.params.lead_id)}`);

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addLabelToLead = async (req, res) => {
    try {
        const { lead_id, label_id } = req.params;
        const data = await aimfox.post(`/leads/${lead_id}/labels/${label_id}`);
        clearSingleCache('getLead', req.query, req.params);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeLabelFromLead = async (req, res) => {
    try {
        const { lead_id, label_id } = req.params;
        const data = await aimfox.delete(`/leads/${lead_id}/labels/${label_id}`);
        clearSingleCache('getLead', req.query, req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchLeads = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('searchLeads', req.query);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const page = req.query.page || 0;
        const count = req.query.count || 20;
        const data = await aimfox.post(`/leads:search?page=${page}&count=${count}`, req.body);

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
