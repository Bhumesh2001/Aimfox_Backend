module.exports = (req, res, next) => {
    const apiKey = req.headers.authorization;
    if (!apiKey || apiKey !== `Bearer ${process.env.AIMFOX_API_KEY}`) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    next();
};
