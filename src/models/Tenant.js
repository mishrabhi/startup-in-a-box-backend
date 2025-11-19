import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
