import { describe, expect, it } from "@jest/globals";
import request from "supertest";

describe("Character", () => {
  const baseUrl = "http://localhost:3000";

  it("should return a character", async () => {
    const res = await request(baseUrl)
      .get("/characters")

    if (res.body.length > 0) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(404);
    }     
  });

  it("should create a character", async () => {
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

    const createCharacter = await request(baseUrl)
      .post("/characters")
      .send({
        name: "Alison",
        seriesIds: `${createSerie.body.serieId}`,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createCharacter.status).toBe(201);

    await request(baseUrl)
      .delete(`/characters/${createCharacter.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should update a character", async () => {
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

    const createCharacter = await request(baseUrl)
      .post("/characters")
      .send({
        name: "Alison",
        seriesIds: `${createSerie.body.serieId}`,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createCharacter.status).toBe(201);

    const updateCharacter = await request(baseUrl)
      .put(`/characters/${createCharacter.body.id}`)
      .send({
        name: "Alison",
        seriesIds: `${createSerie.body.serieId}`,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(updateCharacter.status).toBe(200);

    await request(baseUrl)
      .delete(`/characters/${createCharacter.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should delete a character", async () => {
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

    const createCharacter = await request(baseUrl)
      .post("/characters")
      .send({
        name: "Alison",
        seriesIds: `${createSerie.body.serieId}`,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createCharacter.status).toBe(201);

    await request(baseUrl)
      .delete(`/characters/${createCharacter.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should not return a character", async () => {
    const res = await request(baseUrl)
      .get("/characters/0")

    expect(res.status).toBe(404);
  });
});
