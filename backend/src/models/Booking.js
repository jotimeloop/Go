const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true, index: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  startDate: { type: Date, required: true },
  endDate:   { type: Date, required: true },
  duration:  { type: String, enum: ["daily","weekly","monthly"], default: "daily" },
  total:     { type: Number, required: true },
  status:    { type: String, enum: ["pending","approved","active","completed","rejected","cancelled"], default: "pending", index: true },
}, { timestamps: true });
module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
