const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["customer", "agency", "admin"], default: "customer", index: true },
  preferences: {
    city: { type: String, default: null },
    type: { type: String, enum: ["2W", "4W", null], default: null },
  },
}, { timestamps: true });
userSchema.methods.toSafeJSON = function () {
  return { id: this._id.toString(), name: this.name, email: this.email, role: this.role, preferences: this.preferences };
};
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
