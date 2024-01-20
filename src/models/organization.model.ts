import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  orgId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: false,
  },

  category: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;
