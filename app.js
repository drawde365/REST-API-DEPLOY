const express = require('express')
const crypto = require('crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movie')
const app = express()
const movies = require('./movies.json')
app.disable('x-powered-by')

const port = process.env.PORT ?? 1234

const ALLOWED_ORIGINS = ['http://localhost:8080']

app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('not allowed by CORS'))
    }
  })
)
app.get('/', (req, res) => {
  // res.status(201).send('<h1>Hola añañin</h1>')
  res.send('<h1>Chau bro</h1>')
})

app.get('/movies', (req, res) => {
  // const origin = req.get('Origin')
  // // const origin = req.headers.origin
  // if (origin && ALLOWED_ORIGINS.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }
  const { genre, rate } = req.query

  const filteredMovies = movies.filter(
    (movie) =>
      (genre === undefined ||
        movie.genre.some(
          (genero) => genero.toLowerCase() === genre.toLowerCase()
        )) &&
      (rate === undefined || Number(movie.rate) >= Number(rate))
  )
  res.send(filteredMovies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (!movie) {
    return res.status(404).send('<h1>Película no encontrada</h1>')
  }
  res.send(movie)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json(JSON.parse(result.error))
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(400).json(JSON.parse(result.error))
  }
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  // const movie = movies.find((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).send('<h1>Película no encontrada</h1>')
  }
  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  console.log(updatedMovie)
  movies[movieIndex] = updatedMovie
  res.status(200).json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  // const origin = req.get('Origin')
  // if (origin && ALLOWED_ORIGINS.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }
  const { id } = req.params
  const index = movies.findIndex((movie) => movie.id === id)
  if (index === -1) {
    return res.status(404).send('<h1>Película no encontrada</h1>')
  }
  movies.slice(index, 1)
  res.send(200)
})

// app.options('/movies/:id', (req, res) => {
//   const origin = req.get('Origin')
//   if (origin && ALLOWED_ORIGINS.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELETE')
//   }
//   res.send(200)
// })

app.use((req, res) => {
  res.status(404).send('<h1>No se ha encontrado el recurso(404)</h1>')
})

app.listen(port, () => {
  console.log(`the server is listening on http://localhost:${port}`)
})
