const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ----------- 🔒 Global Security Middlewares ------------
app.use(helmet()); // Sets secure HTTP headers

app.use(cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(express.json({ limit: "10kb" })); // Body size limit to prevent DoS
app.use(express.urlencoded({ extended: true }));

// ----------- 🔒 Rate Limiting ------------
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limit each IP to 100 requests per window
    message: "Too many requests from this IP, try again later"
});
// app.use(limiter);

// ----------- 🔐 API Key Auth Middleware ------------
app.use((req, res, next) => {
    const clientKey = req.headers["x-api-key"];
    if (clientKey !== process.env.CLIENT_API_KEY) {
        return res.status(403).json({ error: "Forbidden" });
    }
    next();
});

// ----------- 📁 Routes ------------
app.use("/", require("./routes/welcome.routes"));
app.use("/api/accounts", require("./routes/account.routes"));
app.use("/api/campaigns", require("./routes/campaign.routes"));
app.use("/api/leads", require("./routes/lead.routes"));
app.use("/api/blacklist", require("./routes/blacklist.routes"));
app.use("/api/analytics", require("./routes/analytics.routes"));
app.use("/api/messages", require("./routes/messages.routes"));
app.use("/api/labels", require("./routes/labels.routes"));
app.use("/api/templates", require("./routes/templates.routes"));
app.use("/api/notes", require("./routes/notes.routes"));

// ----------- 🔥 Global Error Handler ------------
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
