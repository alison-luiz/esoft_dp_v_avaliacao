import { Router } from 'express'
import { ComicController } from '../src/modules/comics/comic.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const comicsRoutes = Router()

comicsRoutes.get('/comics', new ComicController().getAll)

comicsRoutes.use(errorMiddleware)

export { comicsRoutes }

