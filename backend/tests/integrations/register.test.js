//const request = require("supertest");
//const app = require("../app");
import request from "supertest";
import dotenv from "dotenv";
import { app } from "../../app.js";
dotenv.config();
beforeEach(async () => {
  //await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  //await mongoose.connection.close();
});

describe("GET /api/products", () => {
  it("should register user", async () => {
    const code = parseInt(Math.random() * (1000000 - 1) + 1);
    const userName = "user_name_" + code;
    const res = await request(app).post("/api/v1/auth/register").send({
      name: userName,
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ ok: true });
  });

  it("Should must be permission for admin", async () => {
    const user_name = "user_name_478598";
    const res = await request(app).post("/api/v1/auth/login").send({
      name: user_name,
      password: "123456",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({ ok: false });
    expect(res.body).toMatchObject({
      msg: "El usuario no este activo contacte con el administrador",
    });
  });

  it.only("should login user admin", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      name: "admin",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token.length).toBeGreaterThan(10);
    expect(res.body).toMatchObject({ ok: true });
  });
});
