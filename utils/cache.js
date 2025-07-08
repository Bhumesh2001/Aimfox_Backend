const NodeCache = require("node-cache");

// TTL = 10 minutes (600 seconds)
const cache = new NodeCache({
    stdTTL: 600,          // Items live for 600 seconds (10 minutes)
    checkperiod: 120,     // Check every 2 minutes to clear expired items
    useClones: false      // Prevent deep cloning for better performance
});

function clearSingleCache(key) {
    const success = cache.del(key);
    console.log(success ? `🧹 Cleared cache for key: ${key}` : `⚠️ No cache found for key: ${key}`);
    return success;
}

function clearAllCache() {
    cache.flushAll();
    console.log("🧨 All cache cleared.");
}

module.exports = {
    cache,
    clearSingleCache,
    clearAllCache
};
