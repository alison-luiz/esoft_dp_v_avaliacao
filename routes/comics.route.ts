import { Router } from 'express'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const comicsRoutes = Router()

comicsRoutes.use(errorMiddleware)

export { comicsRoutes }

