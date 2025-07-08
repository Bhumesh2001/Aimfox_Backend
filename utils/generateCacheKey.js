/**
 * Generates a unique cache key using function name, query, and params.
 * @param {string} fnName - The function or route identifier.
 * @param {object} query - req.query (optional).
 * @param {object} params - req.params (optional).
 * @returns {string} Unique cache key
 */
module.exports = function generateCacheKey(fnName, query = {}, params = {}) {
    const parts = [fnName];

    const serialize = (obj, label) => {
        const keys = Object.keys(obj).sort();
        if (keys.length === 0) return null;

        const segment = keys
            .map((key) => `${key}=${JSON.stringify(obj[key])}`)
            .join("&");

        return `${label}:${segment}`;
    };

    const queryPart = serialize(query, "query");
    const paramsPart = serialize(params, "params");

    if (paramsPart) parts.push(paramsPart);
    if (queryPart) parts.push(queryPart);

    return parts.join(" | ");
};
