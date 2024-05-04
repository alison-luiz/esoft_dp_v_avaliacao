import { describe, expect, it } from "@jest/globals";
import request from "supertest";

describe("Comic", () => {
  const baseUrl = "http://localhost:3000";

  it("should return a comic", async () => {
    const res = await request(baseUrl)
      .get("/comics")

    if (res.body.length > 0) {
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(404);
    }     
  });

  it("should create a comic", async () => {
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

    const createComic = await request(baseUrl)
      .post("/comics")
      .send({
        name: "New Comic",
        serieId: createSerie.body.serieId,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createComic.status).toBe(201);

    await request(baseUrl)
      .delete(`/comics/${createComic.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should update a comic", async () => {
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

    const createComic = await request(baseUrl)
      .post("/comics")
      .send({
        name: "New Comic",
        serieId: createSerie.body.serieId,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createComic.status).toBe(201);

    const updateComic = await request(baseUrl)
      .put(`/comics/${createComic.body.id}`)
      .send({
        name: "Updated Comic",
        serieId: createSerie.body.serieId,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(updateComic.status).toBe(200);

    await request(baseUrl)
      .delete(`/comics/${createComic.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should delete a comic", async () => {
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

    const createComic = await request(baseUrl)
      .post("/comics")
      .send({
        name: "New Comic",
        serieId: createSerie.body.serieId,
        description: "Test",
        thumbnail: "http://image.com.br",
        thumbnailExtension: "jpg"
      })

      expect(createComic.status).toBe(201);

    await request(baseUrl)
      .delete(`/comics/${createComic.body.id}`)
      .expect(200);

    await request(baseUrl)
      .delete(`/series/${createSerie.body.id}`)
      .expect(200);
  });

  it("should not return a comic", async () => {
    const res = await request(baseUrl)
      .get("/comics/0")

    expect(res.status).toBe(404);
  });
});