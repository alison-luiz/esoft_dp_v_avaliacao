import { Router } from 'express'
import { CharacterController } from '../src/modules/characters/character.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const charactersRoutes = Router()

charactersRoutes.get('/characters', new CharacterController().getAll)
charactersRoutes.get('/characters/:id', new CharacterController().getById)
charactersRoutes.post('/characters', new CharacterController().create)
charactersRoutes.put('/characters/:id', new CharacterController().update)
charactersRoutes.delete('/characters/:id', new CharacterController().delete)

charactersRoutes.use(errorMiddleware)

export { charactersRoutes }

