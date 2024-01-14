import { STATUS } from "enum";
import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  vol_id: {
    type: String,
    required: true,
  },
  opportunity_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [STATUS.ACCEPTED, STATUS.PENDING, STATUS.REJECTED],
    default: STATUS.PENDING,
  },

  feedback: {
    type: String,
    required: false,
  },

  rating: {
    type: Number,
    required: false,
  },

  hours_spent: {
    type: Number,
    required: false,
  },

  recommended_by: {
    type: String,
    required: false,
  },

  recommended_person_designation: {
    type: String,
    required: false,
  },

  created_at: {
    type: Date,
    required: true,
  },

  updated_at: {
    type: Date,
    required: true,
  },
});

const Contribution = mongoose.model("Contribution", contributionSchema);

export default Contribution;
