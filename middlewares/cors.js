import cors from 'cors'

const ALLOWED_ORIGINS = ['http://localhost:8080']

export const middlewareCors = ({ allowedOrigins = ALLOWED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('not allowed by CORS'))
  }
})
