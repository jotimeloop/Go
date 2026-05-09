const router = require("express").Router();
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const { requireAuth, requireRole } = require("../middleware/auth");

// Check overlap availability
async function hasConflict(vehicleId, start, end) {
  return Booking.exists({
    vehicleId,
    status: { $in: ["pending","approved","active"] },
    startDate: { $lt: end },
    endDate:   { $gt: start },
  });
}

router.get("/availability/:vehicleId", async (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) return res.status(400).json({ error: "start & end required" });
  const conflict = await hasConflict(req.params.vehicleId, new Date(start), new Date(end));
  res.json({ available: !conflict });
});

// Create booking (customer)
router.post("/", requireAuth, async (req, res) => {
  const { vehicleId, startDate, endDate, duration } = req.body;
  if (!vehicleId || !startDate || !endDate) return res.status(400).json({ error: "Missing fields" });
  const v = await Vehicle.findById(vehicleId);
  if (!v) return res.status(404).json({ error: "Vehicle not found" });
  const start = new Date(startDate), end = new Date(endDate);
  if (!(end > start)) return res.status(400).json({ error: "Invalid dates" });
  if (await hasConflict(vehicleId, start, end)) return res.status(409).json({ error: "Vehicle not available for those dates" });
  const days = Math.ceil((end - start) / 86400000);
  const total = duration === "monthly" ? v.pricePerMonth || days * v.pricePerDay
              : duration === "weekly"  ? Math.ceil(days/7) * (v.pricePerWeek || v.pricePerDay*7)
              : days * v.pricePerDay;
  const b = await Booking.create({ vehicleId, customerId: req.user._id, startDate: start, endDate: end, duration: duration||"daily", total });
  res.status(201).json({ booking: b });
});

// Customer: my bookings
router.get("/me", requireAuth, async (req, res) => {
  const items = await Booking.find({ customerId: req.user._id }).populate("vehicleId").sort({ createdAt: -1 });
  res.json({ items });
});

// Agency: bookings on my vehicles
router.get("/agency", requireAuth, requireRole("agency"), async (req, res) => {
  const myVehicles = await Vehicle.find({ ownerId: req.user._id }).select("_id");
  const ids = myVehicles.map(v => v._id);
  const items = await Booking.find({ vehicleId: { $in: ids } }).populate("vehicleId customerId").sort({ createdAt: -1 });
  res.json({ items });
});

// Agency / admin update status
router.patch("/:id/status", requireAuth, requireRole("agency"), async (req, res) => {
  const { status } = req.body;
  const allowed = ["approved","rejected","active","completed","cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });
  const b = await Booking.findById(req.params.id).populate("vehicleId");
  if (!b) return res.status(404).json({ error: "Not found" });
  if (req.user.role !== "admin" && String(b.vehicleId.ownerId) !== String(req.user._id))
    return res.status(403).json({ error: "Not your booking" });
  b.status = status; await b.save();
  res.json({ booking: b });
});

// Admin: all bookings
router.get("/", requireAuth, requireRole("admin"), async (req, res) => {
  const items = await Booking.find().populate("vehicleId customerId").sort({ createdAt: -1 });
  res.json({ items });
});

module.exports = router;
