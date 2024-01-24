require("dotenv").config({ path: "./config/.env.test" });
import { STATUS_MESSAGE, SUCCESS_MESSAGES } from "../../src/enum";
import app from "../../src/app";
import mongoose from "mongoose";
import request from "supertest";
import { AuthService } from "../../src/services/auth.service";

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

describe("GET /opportunities", () => {
  it("should return list of opportunities", async () => {
    const { body, statusCode } = await request(app).get(
      "/api/v1/opportunities"
    );

    const response = {
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORDS_FETCHED,
      data: expect.arrayContaining([
        expect.objectContaining({
          oppId: expect.any(String),
          title: expect.any(String),
          status: expect.any(String),
          certificateProvided: expect.any(Boolean),
          organizationName: expect.any(String),
        }),
      ]),
    };

    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});
describe("GET /opportunities/:oppId", () => {
  it("should return details of the opportunity of the id", async () => {
    const { body, statusCode } = await request(app).get(
      "/api/v1/opportunities/65ae490530374996398c4379"
    );

    const response = {
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORD_FETCHED,
      data: expect.objectContaining({
        oppId: expect.any(String),
        title: expect.any(String),
        status: expect.any(String),
        certificateProvided: expect.any(Boolean),
        organizationName: expect.any(String),
        organizationCountry: expect.any(String),
        organizationPhone: expect.any(String),
        organizationAddress: expect.any(String),
        orgId: expect.any(String),
        description: expect.any(String),
        venue: expect.any(String),
        startingDate: expect.any(String),
        startingTime: expect.any(String),
        durationInDays: expect.any(Number),
        hoursPerDay: expect.any(Number),
        volunteerCapacity: expect.any(Number),
        deadline: expect.any(String),
        otherDetails: expect.any(String) || null,
        category: expect.any(String),
        contactPersonName: expect.any(String),
        contactPersonEmail: expect.any(String),
        contactPersonDesignation: expect.any(String),
        updatedAt: expect.any(String),
      }),
    };

    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});
