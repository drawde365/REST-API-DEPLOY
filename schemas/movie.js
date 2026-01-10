import z from 'zod'

const MovieSchema = z.object({
  title: z.string({
    required_error: 'El título es obligatorio',
    invalid_type_error: 'El título debe ser una cadena de texto'
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.url(),
  genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Crime'])).min(1),
  rate: z.number().min(0).max(10)
})

export const validateMovie = (data) => {
  return MovieSchema.safeParse(data)
}

export const validatePartialMovie = (data) => {
  return MovieSchema.partial().safeParse(data)
}
