import { describe, expect, it } from "@jest/globals";
import request from "supertest";

describe("Series", () => {
  const baseUrl = "http://localhost:3000";

  it("should return a series", async () => {
    const res = await request(baseUrl)
      .get("/series")

    if (res.body.length > 0) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(404);
    }     
  });

  it("should create a series", async () => {
    const createSerie = await request(baseUrl)
      .post("/series")
      .send({
        title: "New Serie",
        description: "Test",
        startYear: 2000,
        endYear: 2000,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })
    expect(createSerie.status).toBe(201);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should update a series", async () => {
    const createSerie = await request(baseUrl)
      .post("/series")
      .send({
        title: "New Serie",
        description: "Test",
        startYear: 2000,
        endYear: 2000,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })
    expect(createSerie.status).toBe(201);

    const updateSerie = await request(baseUrl)
      .put(`/series/${createSerie.body.id}`)
      .send({
        title: "Updated Serie",
        description: "Test",
        startYear: 2000,
        endYear: 2000,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })
    expect(updateSerie.status).toBe(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should delete a series", async () => {
    const createSerie = await request(baseUrl)
      .post("/series")
      .send({
        title: "New Serie",
        description: "Test",
        startYear: 2000,
        endYear: 2000,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })
    expect(createSerie.status).toBe(201);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });
});