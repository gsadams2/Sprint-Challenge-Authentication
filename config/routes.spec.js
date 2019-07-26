const request = require("supertest");
const db = require("../database/dbConfig");

const server = require("../api/server");

describe("routes.js", () => {
  beforeAll(async () => {
    await db("users").truncate();
  });

  describe("POST register ", () => {
    it("should get a 201", () => {
      return request(server)
        .post("/api/register")
        .send({ username: "monero", password: "pass" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("POST login ", () => {
    it("should get a 200", () => {
      return request(server)
        .post("/api/login")
        .send({ username: "monero", password: "pass" })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
