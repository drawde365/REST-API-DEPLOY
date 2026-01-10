import { validateMovie, validatePartialMovie } from '../schemas/movie.js'
import { MovieModel } from '../models/movie.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre, rate } = req.query
    const movies = await MovieModel.getAll({ genre, rate })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) {
      return res.status(404).send('<h1>Película no encontrada</h1>')
    }
    res.json(movie)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json(JSON.parse(result.error))
    }

    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (result.error) {
      return res.status(400).json(JSON.parse(result.error))
    }
    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    if (!updatedMovie) {
      return res.status(404).send('<h1>Película no encontrada para actualizar</h1>')
    }
    res.json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const deleted = await MovieModel.delete({ id })
    if (!deleted) {
      return res.status(404).send('<h1>Película no encontrada para eliminar</h1>')
    }
    res.status(200).send('<h1>Película eliminada exitosamente</h1>')
  }
}
