import { Router } from 'express'
import { SeedController } from '../src/modules/seed/seed.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const seedRoutes = Router()

seedRoutes.post('/seed', new SeedController().seed)

seedRoutes.use(errorMiddleware)

export { seedRoutes }

