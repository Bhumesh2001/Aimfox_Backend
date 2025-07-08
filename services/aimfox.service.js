const httpClient = require("../utils/httpClient");

exports.get = async (endpoint) => {
    const response = await httpClient.get(endpoint);
    return response.data;
};

exports.patch = async (endpoint, body) => {
    const response = await httpClient.patch(endpoint, body);
    return response.data;
};

exports.post = async (endpoint, body) => {
    const response = await httpClient.post(endpoint, body);
    return response.data;
};

exports.delete = async (endpoint) => {
    const response = await httpClient.delete(endpoint);
    return response.data;
};
