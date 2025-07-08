const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.getNotes = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getNotes', req.query, req.params);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get(`/leads/${req.params.lead_id}/notes`);

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const data = await aimfox.post(`/leads/${req.params.lead_id}/notes`, req.body);
        clearSingleCache('getNotes', req.query, req.params);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const data = await aimfox.patch(`/leads/${req.params.lead_id}/notes/${req.params.note_id}`, req.body);
        clearSingleCache('getNotes', {}, { lead_id: req.params.lead_id });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const data = await aimfox.delete(`/leads/${req.params.lead_id}/notes/${req.params.note_id}`);
        clearSingleCache('getNotes', {}, { lead_id: req.params.lead_id });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
