import { validateMovie } from '../schemas/movieSchema.js'

export class MoviesController {
  constructor ({ moviesService }) {
    this.moviesService = moviesService
  }

  async getAll (req, res) {
    const { genre, rate } = req.query
    const movies = await this.moviesService.getAll({ genre, rate })
    res.json(movies)
  }

  async getById (req, res) {
    const { id } = req.params
    const movie = await this.moviesService.getById({ id })
    res.json(movie)
  }

  async create (req, res) {
    const result = validateMovie(req.body)
    if (!result.success) {
      const error = new Error('Invalid movie data')
      error.status = 400
      error.message = result.error.errors.map(e => e.message).join(', ')
      throw error
    }
    const createdMovie = await this.moviesService.create({ movieData: req.body })
    res.status(201).json(createdMovie)
  }
}
