import { STATUS } from "enum";
import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  org_id: {
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
  starting_date: {
    type: Date,
    required: true,
  },
  starting_time: {
    type: String,
    required: true,
  },
  duration_in_days: {
    type: Number,
    required: true,
    default: 1,
  },
  hours_per_day: {
    type: Number,
    required: true,
    default: 1,
  },
  volunteer_capacity: {
    type: Number,
    required: true,
    default: 10,
  },

  deadline: {
    type: Date,
    required: true,
  },

  other_details: {
    type: String,
    required: false,
  },

  category: {
    type: String,
    required: true,
  },
  contact_person_name: {
    type: String,
    required: true,
  },

  contact_person_email: {
    type: String,
    required: true,
  },

  contact_person_designation: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: [STATUS.OPEN, STATUS.CLOSED, STATUS.DRAFT],
    default: STATUS.DRAFT,
  },

  certificate_provided: {
    type: Boolean,
    required: true,
    default: false,
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

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;
