require("dotenv").config({ path: "./config/.env.test" });
import { STATUS_MESSAGE, SUCCESS_MESSAGES } from "../src/enum";
import app from "../src/app";
import mongoose from "mongoose";
import request from "supertest";
import { AuthService } from "../src/services/auth.service";

const authService = new AuthService();

let token: string;

beforeAll(async () => {
  const { idToken } = await authService.login(
    process.env.EMAIL_ORG,
    process.env.PASSWORD_ORG
  );

  token = idToken;
});

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
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORDS_FETCHED,
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
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORD_FETCHED,
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

describe("PATCH /organizations", () => {
  it("should update the organization and return success response", async () => {
    const { body, statusCode } = await request(app)
      .patch("/api/v1/organizations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        address: "test address",
        country: "test country",
        name: "test name",
        phone: "test mobile number",
        website: "test website",
        description: "test desc",
        category: "test cat",
        logo: "test url",
        facebook: "test link",
        instagram: "test link",
        twitter: "test link",
      });

    const response = {
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORD_UPDATED,
    };
    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});
