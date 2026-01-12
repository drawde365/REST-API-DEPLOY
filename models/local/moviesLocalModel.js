import { leerArchivoJson } from '../../util/leerArchivoJson.js'
import { randomUUID } from 'crypto'
const movies = leerArchivoJson('../movies.json')

export class MovieModel {
  static getAll = async ({ genre = null, rate = null } = {}) => {
    const filteredMovies = movies.filter(
      (movie) => (!genre || movie.genre.some((genero) => genero.toLowerCase() === genre.toLowerCase())) &&
          (!rate || Number(movie.rate) >= Number(rate))
    )
    return filteredMovies
  }

  static async getById ({ id }) {
    return movies.find((movie) => movie.id === id)
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) {
      return null
    }
    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = updatedMovie
    return updatedMovie
  }

  static async delete ({ id }) {
    const index = movies.findIndex((movie) => movie.id === id)
    if (index === -1) {
      return false
    }
    movies.splice(index, 1)
    return true
  }
}
