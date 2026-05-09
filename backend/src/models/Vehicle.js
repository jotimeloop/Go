const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  agency: String,
  brand: { type: String, required: true },
  name:  { type: String, required: true },
  type:  { type: String, enum: ["2W", "4W"], required: true, index: true },
  year:  Number,
  fuel:  { type: String, enum: ["Petrol", "Diesel", "Electric"] },
  transmission: { type: String, enum: ["Manual", "Automatic"] },
  seats: Number,
  pricePerDay:   { type: Number, required: true },
  pricePerWeek:  Number,
  pricePerMonth: Number,
  image: String,
  city:  { type: String, index: true },
  available: { type: Boolean, default: true },
  approved:  { type: Boolean, default: false, index: true },
  rating: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
