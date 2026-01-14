import express from 'express'
import { createMoviesRouter } from './routes/moviesRoutes.js'
import { MoviesRepositoryMysql } from './repositories/moviesRepositoryMysql.js'
import { MoviesService } from './services/moviesService.js'
import { MoviesController } from './controllers/moviesController.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { middlewareCors } from './middlewares/cors.js'

export function createApp () {
  const app = express()
  app.use(express.json())
  app.use(middlewareCors())
  app.disable('x-powered-by')
  // Wiring (inyección de dependencias)
  const moviesRepository = new MoviesRepositoryMysql()
  console.log(moviesRepository)
  const moviesService = new MoviesService({ moviesRepository })
  console.log(moviesService)
  const moviesController = new MoviesController({ moviesService })
  console.log(moviesController)
  app.use('/movies', createMoviesRouter({ moviesController }))
  app.get('/', (req, res) => {
    res.send('<h1>Welcome to Movies API</h1>')
  })

  // Error handler SIEMPRE al final
  app.use(errorHandler)

  app.use((req, res) => {
    res.status(404).send('<h1>No se ha encontrado el recurso(404)</h1>')
  })

  return app
}
