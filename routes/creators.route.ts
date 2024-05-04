import { Router } from 'express'
import { CreatorController } from '../src/modules/creators/creator.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const creatorsRoutes = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Creator:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - serieId
 *       properties:
 *         id:
 *           type: number
 *           description: ID do criador.
 *         name:
 *           type: string
 *           description: Nome do criador.
 *         role:
 *           type: string
 *           description: Função do criador.
 *         serieId:
 *           type: number
 *           description: ID da série do criador.
 *         creatorId:
 *           type: number
 *           description: ID do criador na API da Marvel.
 *         hasFetchData:
 *           type: boolean
 *           description: Indica se os dados do criador foram buscados na API da Marvel.
 *         thumbnail:
 *           type: string
 *           description: URL da imagem do criador.
 *         thumbnailExtension:
 *           type: string
 *           description: Extensão da imagem do criador.
 *       example:
 *         name: "Stan Lee"
 *         role: "writer"
 *         serieId: 1
 *         thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b"
 *         thumbnailExtension: "jpg"
 */

/**
 * @swagger
 * /creators:
 *   get:
 *     summary: Retorna todos os criadores.
 *     tags:
 *       - Creators
 *     responses:
 *       200:
 *         description: Retorna a lista de criadores.
 *       404:
 *         description: Nenhum criador encontrado.
 */
creatorsRoutes.get('/creators', new CreatorController().getAll)

/**
 * @swagger
 * /creators/roles:
 *   get:
 *     summary: Retorna todos os tipos de funções dos criadores.
 *     tags:
 *       - Creators
 *     responses:
 *       200:
 *         description: Retorna a lista de funções dos criadores.
 *       404:
 *         description: Nenhuma função encontrada.
 */
creatorsRoutes.get('/creators/roles', new CreatorController().getRolesTypes)

/**
 * @swagger
 * /creators/{id}:
 *   get:
 *     summary: Retorna um criador pelo ID.
 *     tags:
 *       - Creators
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do criador.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna o criador.
 *       404:
 *         description: Criador não encontrado.
 */
creatorsRoutes.get('/creators/:id', new CreatorController().getById)

/**
 * @swagger
 * /creators:
 *   post:
 *     summary: Cria um novo criador.
 *     tags:
 *       - Creators
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Creator'
 *     responses:
 *       201:
 *         description: Criador criado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Série não encontrada.
 */
creatorsRoutes.post('/creators', new CreatorController().create)

/**
 * @swagger
 * /creators/{id}:
 *   put:
 *     summary: Atualiza um criador pelo ID.
 *     tags:
 *       - Creators
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do criador.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Creator'
 *     responses:
 *       200:
 *         description: Criador atualizado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Criador não encontrado.
 */
creatorsRoutes.put('/creators/:id', new CreatorController().update)

/**
 * @swagger
 * /creators/{id}:
 *   delete:
 *     summary: Deleta um criador pelo ID.
 *     tags:
 *       - Creators
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do criador.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Criador deletado com sucesso.
 *       404:
 *         description: Criador não encontrado.
 */
creatorsRoutes.delete('/creators/:id', new CreatorController().delete)

creatorsRoutes.use(errorMiddleware)

export { creatorsRoutes }

