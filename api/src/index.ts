import { createAPI } from "./api"

const { api, log } = createAPI()

try {
  api.listen(3000)
  log.info(`API is running at ${api.server?.hostname}:${api.server?.port}`)
} catch (error) {
  log.error(error)
  process.exit(1)
}

export type Api = typeof api
