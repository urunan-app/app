import { Elysia, t } from "elysia"
import { cors } from "@elysiajs/cors"
import { Log } from "./libs/logger"

const log = new Log("api")

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ["content-type", "x-urunan-internal-token"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      origin: ({ headers }): boolean => {
        const origin = headers.get("origin")

        if (!origin) return false

        let domainOnly
        try {
          const url = new URL(origin)
          return true
          domainOnly = url.hostname
        } catch (e) {
          return false
        }

        const allowedOrigins = ["urunan.app", "localhost", "vercel.app"]

        const isAllowed = allowedOrigins.some((allowed) =>
          domainOnly.endsWith(allowed)
        )

        return isAllowed
      },
    })
  )
  .get(
    "/",
    () => ({
      message: "Hello, bro!",
    }),
    {
      response: t.Object({
        message: t.String(),
      }),
    }
  )
  .listen(3000)

export type Api = typeof app

log.info(`API lo is running at ${app.server?.hostname}:${app.server?.port}`)
