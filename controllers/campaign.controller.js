const aimfox = require("../services/aimfox.service");
const { cache, clearSingleCache } = require("../utils/cache");
const generateCacheKey = require("../utils/generateCacheKey");

exports.getAllCampaigns = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getAllCampaigns');
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get("/campaigns");

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCampaign = async (req, res) => {
    try {
        const cacheKey = generateCacheKey('getCampaign', req.query, req.params);
        const cached = cache.get(cacheKey);

        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }
        const data = await aimfox.get(`/campaigns/${req.params.campaign_id}`);

        cache.set(cacheKey, data);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addProfileToCampaign = async (req, res) => {
    try {
        const data = await aimfox.post(`/campaigns/${req.params.campaign_id}/audience`, req.body);
        clearSingleCache('getAllCampaigns');
        clearSingleCache('getCampaign', req.qurey, req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addProfilesWithVars = async (req, res) => {
    try {
        const data = await aimfox.post(`/campaigns/${req.params.campaign_id}/audience/multiple`, req.body);
        clearSingleCache('getAllCampaigns');
        clearSingleCache('getCampaign', req.qurey, req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const data = await aimfox.patch(`/campaigns/${req.params.campaign_id}`, req.body);
        clearSingleCache('getAllCampaigns');
        clearSingleCache('getCampaign', req.qurey, req.params);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
