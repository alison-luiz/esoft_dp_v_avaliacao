import { Router } from 'express'
import { CreatorController } from '../src/modules/creators/creator.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const creatorsRoutes = Router()

creatorsRoutes.get('/creators', new CreatorController().getAll)
creatorsRoutes.get('/creators/roles', new CreatorController().getRolesTypes)
creatorsRoutes.get('/creators/:id', new CreatorController().getById)
creatorsRoutes.post('/creators', new CreatorController().create)
creatorsRoutes.put('/creators/:id', new CreatorController().update)
creatorsRoutes.delete('/creators/:id', new CreatorController().delete)

creatorsRoutes.use(errorMiddleware)

export { creatorsRoutes }

