const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.getAllLabels = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getAllLabels');
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get("/labels");

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createLabel = async (req, res) => {
    try {
        const data = await aimfox.post("/labels", req.body);
        clearSingleCache('getAllLabels');
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateLabel = async (req, res) => {
    try {
        const data = await aimfox.patch(`/labels/${req.params.label_id}`, req.body);
        clearSingleCache('getAllLabels');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteLabel = async (req, res) => {
    try {
        const data = await aimfox.delete(`/labels/${req.params.label_id}`);
        clearSingleCache('getAllLabels');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
