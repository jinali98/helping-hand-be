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
    process.env.EMAIL_VOL,
    process.env.PASSWORD_VOL
  );

  token = idToken;
});

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /volunteers", () => {
  it("should return list of volunteers", async () => {
    const { body, statusCode } = await request(app).get("/api/v1/volunteers");

    const response = {
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORDS_FETCHED,
      data: expect.arrayContaining([
        expect.objectContaining({
          volId: expect.any(String),
          name: expect.any(String),
          country: expect.any(String),
          score: expect.any(Number),
          isPublic: expect.any(Boolean),
        }),
      ]),
    };

    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});

describe("GET /volunteers/:volId", () => {
  it("should return details of the volunteer by id", async () => {
    const { body, statusCode } = await request(app).get(
      "/api/v1/volunteers/afa36e5d-9d4d-4d09-957f-4d0db7e76150"
    );

    const response = {
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORD_FETCHED,
      data: expect.objectContaining({
        email: expect.any(String),
        name: expect.any(String),
        country: expect.any(String),
        score: expect.any(Number),
        isPublic: expect.any(Boolean),
      }),
    };

    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});

describe("PATCH /volunteers", () => {
  it("should update the volunteer profile details and return success response", async () => {
    const { body, statusCode } = await request(app)
      .patch("/api/v1/volunteers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        address: "123 Test Street, Test City",
        country: "Testland",
        name: "Test User",
        bio: "This is a test bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profilePic: "https://example.com/test-profile-pic.jpg",
        isPublic: true,
      });

    const response = {
      status: STATUS_MESSAGE.SUCCESS,
      message: SUCCESS_MESSAGES.RECORD_UPDATED,
    };
    expect(statusCode).toBe(200);
    expect(body).toEqual(response);
  });
});
