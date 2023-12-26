require("dotenv/config");
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import swaggerDoc from "../doc/swagger.json";

import authRouter from "./routes/auth.route";

const port = process.env.PORT || 3000;

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/auth", authRouter);

// SERVER
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
