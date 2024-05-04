import { Router } from "express";
import { ComicController } from "../src/modules/comics/comic.controller";
import { errorMiddleware } from "../src/shared/middlewares/error.middleware";

const comicsRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comic:
 *       type: object
 *       required:
 *         - name
 *         - serieId
 *       properties:
 *         id:
 *           type: number
 *           description: ID do quadrinho.
 *         name:
 *           type: string
 *           description: Nome do quadrinho.
 *         serieId:
 *           type: number
 *           description: ID da série do quadrinho.
 *         comicId:
 *           type: number
 *           description: ID do quadrinho na API da Marvel.
 *         hasFetchData:
 *           type: boolean
 *           description: Indica se os dados do quadrinho foram buscados na API da Marvel.
 *         description:
 *           type: string
 *           description: Descrição do quadrinho.
 *         thumbnail:
 *           type: string
 *           description: URL da imagem do quadrinho.
 *         thumbnailExtension:
 *           type: string
 *           description: Extensão da imagem do quadrinho.
 *       example:
 *         name: "Homem de Ferro"
 *         serieId: 1
 *         description: "O Homem de Ferro é um super-herói..."
 *         thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55"
 *         thumbnailExtension: "jpg"
 */

/**
 * @swagger
 * /comics:
 *   get:
 *     summary: Retorna todos os quadrinhos.
 *     tags:
 *       - Comics
 *     responses:
 *       200:
 *         description: Retorna a lista de quadrinhos.
 *       404:
 *         description: Nenhum quadrinho encontrado.
 */
comicsRoutes.get("/comics", new ComicController().getAll);

/**
 * @swagger
 * /comics/{id}:
 *   get:
 *     summary: Retorna um quadrinho pelo ID.
 *     tags:
 *       - Comics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadrinho.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna o quadrinho.
 *       404:
 *         description: Quadrinho não encontrado.
 */
comicsRoutes.get("/comics/:id", new ComicController().getById);

/**
 * @swagger
 * /comics:
 *   post:
 *     summary: Cria um novo quadrinho.
 *     tags:
 *       - Comics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comic'
 *     responses:
 *       201:
 *         description: Quadrinho criado com sucesso.
 *       400:
 *         description: Erro na requisição.
 */
comicsRoutes.post("/comics", new ComicController().create);

/**
 * @swagger
 * /comics/{id}:
 *   put:
 *     summary: Atualiza um quadrinho pelo ID.
 *     tags:
 *       - Comics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadrinho.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comic'
 *     responses:
 *       200:
 *         description: Quadrinho atualizado com sucesso.
 *       400:
 *         description: Erro na requisição.
 */
comicsRoutes.put("/comics/:id", new ComicController().update);

/**
 * @swagger
 * /comics/{id}:
 *   delete:
 *     summary: Deleta um quadrinho pelo ID.
 *     tags:
 *       - Comics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do quadrinho.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quadrinho deletado com sucesso.
 *       404:
 *         description: Quadrinho não encontrado.
 */
comicsRoutes.delete("/comics/:id", new ComicController().delete);

comicsRoutes.use(errorMiddleware);

export { comicsRoutes };

