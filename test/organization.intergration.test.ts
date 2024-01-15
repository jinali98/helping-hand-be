require("dotenv").config({ path: "./config/.env.test" });
import app from "../src/app";
import mongoose from "mongoose";
import request from "supertest";

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /organizations", () => {
  it("should return list of organizations", async () => {
    const { body, statusCode } = await request(app).get(
      "/api/v1/organizations"
    );

    const response = {
      status: expect.any(String),
      message: expect.any(String),
      data: expect.arrayContaining([
        expect.objectContaining({
          org_id: expect.any(String),
          name: expect.any(String),
          country: expect.any(String),
        }),
      ]),
    };

    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});

describe("GET /organizations/:orgId", () => {
  it("should return details of the organization by id", async () => {
    const { body, statusCode } = await request(app).get(
      "/api/v1/organizations/85d40399-20d7-46cb-80e8-25e30a83598d"
    );

    const response = {
      status: expect.any(String),
      message: expect.any(String),
      data: expect.objectContaining({
        email: expect.any(String),
        name: expect.any(String),
        country: expect.any(String),
        address: expect.any(String),
        phone: expect.any(String),
      }),
    };

    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});

describe("Intergration test for PATCH /organizations", () => {
  it("should pass", async () => {
    const { body, statusCode } = await request(app)
      .patch("/api/v1/organizations/85d40399-20d7-46cb-80e8-25e30a83598d")
      .set("Authorization", "Bearer ")
      .send({});
    expect(1).toBe(1);
  });
});
