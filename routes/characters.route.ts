import { Router } from 'express'
import { CharacterController } from '../src/modules/characters/character.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const charactersRoutes = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       required:
 *         - name
 *         - seriesIds
 *       properties:
 *         id:
 *           type: number
 *           description: ID do personagem.
 *         name:
 *           type: string
 *           description: Nome do personagem.
 *         seriesIds:
 *           type: string
 *           description: IDs das séries do personagem na API da Marvel (Separados por vírgula).
 *         characterId:
 *           type: number
 *           description: ID do personagem na API da Marvel.
 *         hasFetchData:
 *           type: boolean
 *           description: Indica se os dados do personagem foram buscados na API da Marvel.
 *         description:
 *           type: string
 *           description: Descrição do personagem.
 *         thumbnail:
 *           type: string
 *           description: URL da imagem do personagem.
 *         thumbnailExtension:
 *           type: string
 *           description: Extensão da imagem do personagem.
 *       example:
 *         name: "Homem-Aranha"
 *         seriesIds: "1067"
 *         description: "O Homem-Aranha...."
 *         thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b"
 *         thumbnailExtension: "jpg"
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Retorna todos os personagens.
 *     tags:
 *       - Characters
 *     responses:
 *       200:
 *         description: Retorna a lista de personagens.
 *       404:
 *         description: Nenhum personagem encontrado.
 */
charactersRoutes.get('/characters', new CharacterController().getAll)

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Retorna um personagem pelo ID.
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do personagem.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna o personagem.
 *       404:
 *         description: Personagem não encontrado.
 */
charactersRoutes.get('/characters/:id', new CharacterController().getById)

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Cria um novo personagem.
 *     tags:
 *       - Characters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       201:
 *         description: Personagem criado com sucesso.
 *       400:
 *         description: Erro ao criar personagem.
 */
charactersRoutes.post('/characters', new CharacterController().create)

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Atualiza um personagem pelo ID.
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do personagem.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       200:
 *         description: Personagem atualizado com sucesso.
 *       404:
 *         description: Personagem não encontrado.
 */
charactersRoutes.put('/characters/:id', new CharacterController().update)

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Deleta um personagem pelo ID.
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do personagem.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personagem deletado com sucesso.
 *       404:
 *         description: Personagem não encontrado.
 */
charactersRoutes.delete('/characters/:id', new CharacterController().delete)

charactersRoutes.use(errorMiddleware)

export { charactersRoutes }

