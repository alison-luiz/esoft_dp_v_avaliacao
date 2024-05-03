import { Router } from 'express'
import { SerieController } from '../src/modules/series/serie.controller'
import { errorMiddleware } from '../src/shared/middlewares/error.middleware'

const seriesRoutes = Router()

seriesRoutes.get('/series', new SerieController().getAll)
seriesRoutes.post('/series', new SerieController().create)
seriesRoutes.put('/series/:id', new SerieController().update)
seriesRoutes.delete('/series/:id', new SerieController().delete)

seriesRoutes.use(errorMiddleware)

export { seriesRoutes }

