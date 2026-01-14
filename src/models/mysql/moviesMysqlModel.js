import db from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'admin',
  password: '336655',
  database: 'moviesDb',
  port: 3306
}

const connection = await db.createConnection(config)

export class MovieModel {
  static getAll = async () => {
    const sql = `
    select bin_to_uuid(m.id) as id,m.title,m.year,m.director,m.duration,m.poster,m.rate,g.name as genre
    from Movies m
    join Movies_Genres mg on m.id=mg.movie_id
    join Genres g on  mg.genre_id =g.id 
    where m.rate >=? and LOWER(g.name) like LOWER(?)`

    const [movies] = await connection.query(sql, [rate, `%${genre}%`])
    return movies
  }

  static async getById ({ id }) {
    
  }

  static async create ({ input }) {

  }

  static async update ({ id, input }) {

  }

  static async delete ({ id }) {

  }
}
