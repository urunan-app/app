import { createAPI } from "./api"
import { Database } from "./db"

import { Log } from "./libs/logger"

const { log } = new Log("api")

const api = createAPI()

const { connect } = new Database()

try {
  connect()
  api.listen(3000)
  log.info(`API is running at ${api.server?.hostname}:${api.server?.port}`)
} catch (error) {
  log.error(error)
  process.exit(1)
}

export type Api = typeof api
