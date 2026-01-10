import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { middlewareCors } from './middlewares/cors.js'

const port = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(middlewareCors())

app.get('/', (req, res) => {
  // res.status(201).send('<h1>Hola añañin</h1>')
  res.send('<h1>Chau bro</h1>')
})

app.use('/movies', moviesRouter)

app.use((req, res) => {
  res.status(404).send('<h1>No se ha encontrado el recurso(404)</h1>')
})

app.listen(port, () => {
  console.log(`the server is listening on http://localhost:${port}`)
})
