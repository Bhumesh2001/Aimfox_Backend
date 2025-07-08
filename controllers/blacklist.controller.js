const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.list = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('list');
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get("/blacklist");

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.add = async (req, res) => {
    try {
        const data = await aimfox.post(`/blacklist/${req.params.urn}`);
        clearSingleCache('list');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const data = await aimfox.delete(`/blacklist/${req.params.urn}`);
        clearSingleCache('list');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};