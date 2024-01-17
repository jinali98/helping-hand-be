require("dotenv").config({ path: "./config/.env.dev" });

import mongoose from "mongoose";

import app from "./app";

const port = process.env.PORT || 3000;

// Connect to MongoDB using mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

// SERVER
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
