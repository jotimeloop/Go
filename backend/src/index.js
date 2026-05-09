require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => res.json({ name: "RentiGo API", status: "ok" }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Lazy-connect on first request (works for serverless on Vercel)
app.use(async (req, _res, next) => { try { await connectDB(); next(); } catch (e) { next(e); } });

app.use("/api/auth",     require("./routes/auth"));
app.use("/api/vehicles", require("./routes/vehicles"));
app.use("/api/bookings", require("./routes/bookings"));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log("RentiGo API listening on", port));
}

module.exports = app;
