const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.listAccounts = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('listAccounts');
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get("/accounts");

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAccountLimits = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getAccountLimits', req.query, req.params);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get(`/accounts/${req.params.account_id}/limits`);

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.setAccountLimits = async (req, res) => {
    try {
        const data = await aimfox.patch(`/accounts/${req.params.account_id}/limits`, req.body);
        clearSingleCache('getAccountLimits', req.query, req.params);
        clearSingleCache('listAccounts');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
