import { Router } from 'express'
import { SeedController } from '../src/modules/seed/seed.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const seedRoutes = Router()

/**
 * @swagger
 * /seed:
 *   post:
 *     summary: Semear dados na base de dados.
 *     tags:
 *       - Seeder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - your_public_key
 *               - your_private_key
 *               - saga
 *             properties:
 *               your_public_key:
 *                 type: string
 *                 description: Chave pública da API da Marvel.
 *               your_private_key:
 *                 type: string
 *                 description: Chave privada da API da Marvel.
 *               saga:
 *                 type: string
 *                 description: Saga a ser buscada na API da Marvel.
 *     responses:
 *       200:
 *         description: Retorna a mensagem de sucesso.
 *       500:
 *         description: Retorna a mensagem de erro.
 */
seedRoutes.post('/seed', new SeedController().seed)

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Reseta a base de dados.
 *     tags:
 *       - Seeder
 *     responses:
 *       200:
 *         description: Retorna a mensagem de sucesso.
 *       500:
 *         description: Retorna a mensagem de erro.
 */
seedRoutes.post('/reset', new SeedController().reset)

seedRoutes.use(errorMiddleware)

export { seedRoutes }

