function required (name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const env = {
  port: Number(process.env.PORT ?? 3000),

  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    name: required('DB_NAME')
  }
}
