import { STATUS } from "enum";
import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  volId: {
    type: String,
    required: true,
  },
  opportunityId: {
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

  hoursSpent: {
    type: Number,
    required: false,
  },

  recommendedBy: {
    type: String,
    required: false,
  },

  recommendedPersonDesignation: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    required: true,
  },

  updatedAt: {
    type: Date,
    required: true,
  },
});

const Contribution = mongoose.model("Contribution", contributionSchema);

export default Contribution;
