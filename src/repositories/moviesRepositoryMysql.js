import { pool } from '../db/mysqlPool.js'
import { randomUUID } from 'crypto'

export class MoviesRepositoryMysql {
  async getAll ({ genre, rate }) {
    const query = `
    select bin_to_uuid(m.id) as id,m.title,m.year,m.director,m.duration,m.poster,m.rate,g.name as genre
    from Movies m
    join Movies_Genres mg on m.id=mg.movie_id
    join Genres g on  mg.genre_id =g.id 
    where m.rate >=? and LOWER(g.name) like LOWER(?)`

    const [movies] = await pool.query(query, [rate, `%${genre}%`])
    return movies ?? null
  }

  async getById ({ id }) {
    const sql = `
    select * from Movies where bin_to_uuid(id)=?`
    const [movies] = await pool.query(sql, [id])
    return movies[0] ?? null
  }

  async create ({ movieData }) {
    const id = randomUUID()
    const sql = `
    insert into Movies (id, title, year, director, duration, poster, rate)
    values (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`
    await pool.query(sql, [
      id,
      movieData.title,
      movieData.year,
      movieData.director,
      movieData.duration,
      movieData.poster,
      movieData.rate
    ])
    movieData.id = id

    for (const genre of movieData.genre) {
      const genreSql = `insert into Movies_Genres (movie_id, genre_id)
      values (UUID_TO_BIN(?), (select id from Genres where name=?))`
      await pool.query(genreSql, [id, genre])
    }

    return movieData
  }

  async update ({ id, input }) {

  }

  async delete ({ id }) {

  }
}
