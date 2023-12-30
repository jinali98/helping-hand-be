require("dotenv/config");
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import mongoose from "mongoose";

import swaggerDoc from "../doc/swagger.json";
import mongoSanitize from "express-mongo-sanitize";

import authRouter from "./routes/auth.route";
import { CustomError, globalErrorHandler } from "./services/exception.service";

import { limiter } from "./configs/rateLimiter.config";
import { config } from "./configs/cors.config";

const port = process.env.PORT || 3000;

const app = express();

app.use(cors(config));

app.use(limiter);
app.use(mongoSanitize());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", authRouter);

app.all("*", (req, res, next) => {
  next(new CustomError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

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
