import { Router } from 'express'

export function createMoviesRouter ({ moviesController }) {
  const moviesRouter = Router()

  moviesRouter.get('/', moviesController.getAll.bind(moviesController))

  moviesRouter.get('/:id', moviesController.getById.bind(moviesController))

  moviesRouter.post('/', moviesController.create.bind(moviesController))

  // moviesRouter.patch('/:id', moviesController.update)

  // moviesRouter.delete('/:id', moviesController.delete)

  return moviesRouter
}
