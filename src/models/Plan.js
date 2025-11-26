import mongoose from "mongoose";

const planSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    pricePerMonth: { type: Number, required: true },
    stripePriceId: { type: String },
    limits: {
      maxUsers: { type: Number, default: 5 },
      maxWidgets: { type: Number, default: 5 },
      maxDocs: { type: Number, default: 10 },
    },
  },
  { timeStamps: true }
);

export default mongoose.model("Plan", planSchema);
