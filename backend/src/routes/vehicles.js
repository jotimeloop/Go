const router = require("express").Router();
const Vehicle = require("../models/Vehicle");
const { requireAuth, requireRole } = require("../middleware/auth");

// Public listing — only approved + available
router.get("/", async (req, res) => {
  const { type, city, fuel, maxPrice } = req.query;
  const q = { approved: true };
  if (type) q.type = type;
  if (city) q.city = city;
  if (fuel) q.fuel = fuel;
  if (maxPrice) q.pricePerDay = { $lte: Number(maxPrice) };
  const items = await Vehicle.find(q).sort({ createdAt: -1 }).limit(100);
  res.json({ items });
});

router.get("/:id", async (req, res) => {
  const v = await Vehicle.findById(req.params.id);
  if (!v) return res.status(404).json({ error: "Not found" });
  res.json({ vehicle: v });
});

// Agency creates listing (pending approval)
router.post("/", requireAuth, requireRole("agency"), async (req, res) => {
  const v = await Vehicle.create({ ...req.body, ownerId: req.user._id, approved: false });
  res.status(201).json({ vehicle: v });
});

// Agency: my fleet
router.get("/owner/me", requireAuth, requireRole("agency"), async (req, res) => {
  const items = await Vehicle.find({ ownerId: req.user._id });
  res.json({ items });
});

// Admin approval
router.patch("/:id/approve", requireAuth, requireRole("admin"), async (req, res) => {
  const v = await Vehicle.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json({ vehicle: v });
});

module.exports = router;
