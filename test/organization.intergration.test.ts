require("dotenv").config({ path: "./config/.env.test" });
import { STATUS_MESSAGE, SUCCESS_MESSAGES } from "../src/enum";
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
      .set(
        "Authorization",
        "Bearer eyJraWQiOiJwdTRreHY1eVQ4bjJ1czVibjRRYzg3TEI4S3ZtZmVqWWxJd0p4T3pmb1pVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4NWQ0MDM5OS0yMGQ3LTQ2Y2ItODBlOC0yNWUzMGE4MzU5OGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9XUVY1dGV4SmUiLCJjb2duaXRvOnVzZXJuYW1lIjoiODVkNDAzOTktMjBkNy00NmNiLTgwZTgtMjVlMzBhODM1OThkIiwib3JpZ2luX2p0aSI6ImJmOGYyZGE5LTcyMjEtNDQyZC1iZmE2LTUyYzg5ZTllZjAyMSIsImN1c3RvbTp1c2VyVHlwZSI6Im9yZ2FuaXphdGlvbiIsImF1ZCI6IjdyMGU1aDYwY2Izc2QyZnFhM2phZWxvbDhkIiwiZXZlbnRfaWQiOiIyZmI4NGJkNC05YTI0LTRjYjEtYWJlOS1kZGZhOTkwZWFlMjYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcwNTMzMjM5MiwiZXhwIjoxNzA1MzM1OTkyLCJpYXQiOjE3MDUzMzIzOTIsImp0aSI6ImJkYmU1MzUwLTNlY2UtNDI1Yy05YjczLWYwNTQ4NWE4Y2E3OSIsImVtYWlsIjoiamluYWxpcGFiYXNhcmFAZ21haWwuY29tIn0.kWv5QM8LR0W8-RAY--yWAIV4l_UlhFLG3G496-S_Kl9AX6hrWAdEd4ml-ABWWKYx5nKZjdMJ6gK_FBNeqYapVwPWuNyn5QcfsGGzRixqZfZv48cqfBvLJ61EiTdNlI8ha8IS2Y1r9OdQ5Xt0oW1Tq1Yg2sk0-qgVc4ND7SuRlE5r2KYKKb7a1c4uzss8Hk4iXhVHwenEQQfhfgZcHsmAV3hqbz1ZIbfUrmh4HCyTLrab9MEsx6Bh6efSKi9olehNXq4H4oT70TVJGuL2X7WXwZnOX_qxnolltsMLbNiAqA9N3xN1r2jjPgWPa8vuEoKehi3QY6EBxb3X7tCHT_wysQ"
      )
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
