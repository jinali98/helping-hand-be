import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  volId: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  bio: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: false,
  },

  profilePic: {
    type: String,
    required: false,
  },

  score: {
    type: Number,
    required: false,
    default: 0,
  },

  isPublic: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
