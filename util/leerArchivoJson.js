// esto es valido pero para versiones recientes de node
// import movies from './movies.json' with { type: 'json' }

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

export const leerArchivoJson = (ruta) => require(ruta)
