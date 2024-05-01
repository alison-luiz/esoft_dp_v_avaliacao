import { Router } from 'express'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const charactersRoutes = Router()

charactersRoutes.use(errorMiddleware)

export { charactersRoutes }

