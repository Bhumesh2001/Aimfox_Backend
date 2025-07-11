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

exports.getTemplateById = async (req, res) => {
    const { template_id } = req.params;

    try {
        const cacheKey = generateCacheKey('getTemplateById');
        const cached = cache.get(cacheKey);
        if (cached) {
            // console.log("📦 Cache hit:", cacheKey);
            return res.json(cached);
        }

        const response = await aimfox.get(`/templates/${template_id}`);        
        if (!response?.template) {
            return res.status(404).json({ status: "error", message: "Template not found" });
        }

        cache.set(cacheKey, response);
        // console.log("📡 Cache miss - data cached:", cacheKey);

        res.json({ status: "ok", template: response.template });
    } catch (err) {                
        res.status(500).json({
            status: "error",
            message: err.message || "Failed to fetch template"
        });
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
