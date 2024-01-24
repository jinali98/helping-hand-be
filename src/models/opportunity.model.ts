import { STATUS } from "../enum";
import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  orgId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  venue: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  startingTime: {
    type: String,
    required: true,
  },
  durationInDays: {
    type: Number,
    required: true,
    default: 1,
  },
  hoursPerDay: {
    type: Number,
    required: true,
    default: 1,
  },
  volunteerCapacity: {
    type: Number,
    required: true,
    default: 10,
  },

  deadline: {
    type: Date,
    required: true,
  },

  otherDetails: {
    type: String,
    required: false,
  },

  category: {
    type: String,
    required: true,
  },
  contactPersonName: {
    type: String,
    required: true,
  },

  contactPersonEmail: {
    type: String,
    required: true,
  },

  contactPersonDesignation: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: [STATUS.OPEN, STATUS.CLOSED, STATUS.DRAFT],
    default: STATUS.DRAFT,
  },

  certificateProvided: {
    type: Boolean,
    required: true,
    default: false,
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

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;
