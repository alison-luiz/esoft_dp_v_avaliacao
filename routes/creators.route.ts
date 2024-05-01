import { Router } from 'express'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const creatorsRoutes = Router()

creatorsRoutes.use(errorMiddleware)

export { creatorsRoutes }

