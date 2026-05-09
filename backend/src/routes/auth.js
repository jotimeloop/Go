const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const limiter = rateLimit({ windowMs: 15*60*1000, max: 30 });
router.use(limiter);

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6).max(200),
  role: z.enum(["customer","agency"]).default("customer"),
  preferences: z.object({ city: z.string().nullable().optional(), type: z.enum(["2W","4W"]).nullable().optional() }).optional(),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

function sign(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
}

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: data.email });
    if (exists) return res.status(409).json({ error: "Email already registered" });
    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await User.create({ name: data.name, email: data.email, passwordHash, role: data.role, preferences: data.preferences || {} });
    return res.status(201).json({ token: sign(user), user: user.toSafeJSON() });
  } catch (e) {
    if (e.name === "ZodError") return res.status(400).json({ error: e.errors[0]?.message || "Invalid input" });
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid email or password" });
    return res.json({ token: sign(user), user: user.toSafeJSON() });
  } catch (e) {
    if (e.name === "ZodError") return res.status(400).json({ error: e.errors[0]?.message || "Invalid input" });
    return res.status(500).json({ error: "Server error" });
  }
});

const { requireAuth } = require("../middleware/auth");
router.get("/me", requireAuth, (req, res) => res.json({ user: req.user.toSafeJSON() }));

module.exports = router;
