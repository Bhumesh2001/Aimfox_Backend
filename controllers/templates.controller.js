const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.getAllTemplates = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getAllTemplates');
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get("/templates");

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTemplate = async (req, res) => {
    try {
        const data = await aimfox.post("/templates", req.body);
        clearSingleCache('getAllTemplates');
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTemplate = async (req, res) => {
    try {
        const data = await aimfox.patch(`/templates/${req.params.template_id}`, req.body);
        clearSingleCache('getAllTemplates');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTemplate = async (req, res) => {
    try {
        const data = await aimfox.delete(`/templates/${req.params.template_id}`);
        clearSingleCache('getAllTemplates');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
