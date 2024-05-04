import { describe, expect, it } from "@jest/globals";
import request from "supertest";

describe("Creator", () => {
  const baseUrl = "http://localhost:3000";

  it("should return a creator", async () => {
    const res = await request(baseUrl)
      .get("/creators")

    if (res.body.length > 0) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(404);
    }     
  });

  it("should create a creator", async () => {
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

    const createCreator = await request(baseUrl)
      .post("/creators")
      .send({
        name: "Alison",
        role: "Test",
        serieId: createSerie.body.serieId,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createCreator.status).toBe(201);

    await request(baseUrl)
      .delete(`/creators/${createCreator.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should update a creator", async () => {
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

    const createCreator = await request(baseUrl)
      .post("/creators")
      .send({
        name: "Alison",
        role: "Test",
        serieId: createSerie.body.serieId,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createCreator.status).toBe(201);

    const updateCreator = await request(baseUrl)
      .put(`/creators/${createCreator.body.id}`)
      .send({
        name: "Alison",
        role: "Test",
        serieId: createSerie.body.serieId,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(updateCreator.status).toBe(200);

    await request(baseUrl)
      .delete(`/creators/${createCreator.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should delete a creator", async () => {
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

    const createCreator = await request(baseUrl)
      .post("/creators")
      .send({
        name: "Alison",
        role: "Test",
        serieId: createSerie.body.serieId,
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createCreator.status).toBe(201);

    await request(baseUrl)
      .delete(`/creators/${createCreator.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });
});