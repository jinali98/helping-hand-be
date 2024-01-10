import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["org", "vol"],
    default: "vol",
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
  // Volunteer fields
  volName: {
    type: String,
    required: function () {
      return this.userType === "vol";
    },
  },

  // Organization fields
  orgName: {
    type: String,
    required: function () {
      return this.userType === "org";
    },
  },
  orgWebsite: {
    type: String,
    required: false,
  },
  orgDescription: {
    type: String,
    required: false,
  },

  orgCategory: {
    type: String,
    required: false,
  },
  orgLogo: {
    type: String,
    required: false,
  },
  orgFacebook: {
    type: String,
    required: false,
  },
  orgInstagram: {
    type: String,
    required: false,
  },
  orgTwitter: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
