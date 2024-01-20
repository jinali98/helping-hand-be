import { STATUS } from "enum";
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
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

  resumeUrl: {
    type: String,
    required: true,
  },

  purposeLetterUrl: {
    type: String,
    required: true,
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

const Application = mongoose.model("Application", applicationSchema);

export default Application;
