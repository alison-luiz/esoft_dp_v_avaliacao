import { Router } from 'express'
import { CreatorController } from '../src/modules/creators/creator.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const creatorsRoutes = Router()

creatorsRoutes.get('/creators', new CreatorController().getAll)

creatorsRoutes.use(errorMiddleware)

export { creatorsRoutes }

