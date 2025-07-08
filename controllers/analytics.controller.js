const aimfox = require("../services/aimfox.service");
const { cache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.recentLeads = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('recentLeads');
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get("/analytics/recent-leads");

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.interactions = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('interactions', req.query);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const { bucket, from, to, account_ids } = req.query;

        const query = `/analytics/interactions?` +
            `bucket=${encodeURIComponent(bucket)}&` +
            `from=${encodeURIComponent(from)}&` +
            `to=${encodeURIComponent(to)}&` +
            `account_ids=${encodeURIComponent(account_ids)}`;

        const data = await aimfox.get(query);
        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
