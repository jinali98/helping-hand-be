import { STATUS } from "enum";
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
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

  resume_url: {
    type: String,
    required: true,
  },

  purpose_letter_url: {
    type: String,
    required: true,
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

const Application = mongoose.model("Application", applicationSchema);

export default Application;
