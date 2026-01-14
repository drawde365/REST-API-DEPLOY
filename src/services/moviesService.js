export class MoviesService {
  constructor ({ moviesRepository }) {
    this.moviesRepository = moviesRepository
  }

  async getAll ({ genre = '', rate = -1 } = {}) {
    return await this.moviesRepository.getAll({ genre, rate })
  }

  async getById ({ id }) {
    const movie = await this.moviesRepository.getById({ id })
    if (!movie) {
      const err = new Error('Movie not found')
      err.statusCode = 404
      throw err
    }
    return movie
  }

  async create ({ movieData }) {
    const createdMovie = await this.moviesRepository.create({ movieData })
    return createdMovie
  }
}
