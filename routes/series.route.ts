import { Router } from 'express'
import { SerieController } from '../src/modules/series/serie.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const seriesRoutes = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Serie:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startYear
 *         - endYear
 *       properties:
 *         id:
 *           type: number
 *           description: ID da série.
 *         title:
 *           type: string
 *           description: Título da série.
 *         description:
 *           type: string
 *           description: Descrição da série.
 *         startYear:
 *           type: number
 *           description: Ano de início da série.
 *         endYear:
 *           type: number
 *           description: Ano de término da série.
 *         thumbnail:
 *           type: string
 *           description: URL da imagem da série.
 *         thumbnailExtension:
 *           type: string
 *           description: Extensão da imagem da série.
 *       example:
 *         title: "Homem-Aranha"
 *         description: "O Homem-Aranha é um personagem fictício, um super-herói que aparece nas revistas em quadrinhos americanas publicadas pela Marvel Comics."
 *         startYear: 1962
 *         endYear: 2021
 *         thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b"
 *         thumbnailExtension: "jpg"
 */

/**
 * @swagger
 * /series:
 *   get:
 *     summary: Retorna todas as séries
 *     tags:
 *       - Series
 *     responses:
 *       200:
 *         description: Retorna a lista de séries.
 *       404:
 *         description: Retorna a mensagem de erro.
 */
seriesRoutes.get('/series', new SerieController().getAll)

/**
 * @swagger
 * /series:
 *   post:
 *     summary: Cria uma nova série
 *     tags:
 *       - Series
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Serie'
 *     responses:
 *       201:
 *         description: Série criada com sucesso.
 *       400:
 *         description: Requisição inválida.
 */
seriesRoutes.post('/series', new SerieController().create)

/**
 * @swagger
 * /series/{id}:
 *   put:
 *     summary: Atualiza uma série pelo ID
 *     tags:
 *       - Series
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da série
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Serie'
 *     responses:
 *       200:
 *         description: Série atualizada com sucesso.
 *       400:
 *         description: Requisição inválida.
 */
seriesRoutes.put('/series/:id', new SerieController().update)

/**
 * @swagger
 * /series/{id}:
 *   delete:
 *     summary: Deleta uma série pelo ID
 *     tags:
 *       - Series
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da série
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Série deletada com sucesso.
 *       404:
 *         description: Série não encontrada.
 */
seriesRoutes.delete('/series/:id', new SerieController().delete)

seriesRoutes.use(errorMiddleware)

export { seriesRoutes }

