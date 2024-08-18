import { cors } from "@elysiajs/cors"
import { serverTiming } from "@elysiajs/server-timing"
import Elysia from "elysia"
import { swagger } from "@elysiajs/swagger"
import { Database } from "@/db"

export class APIBase {
  protected database: Database
  constructor() {
    this.database = new Database()
    this.initDatabase()
  }

  protected initDatabase() {
    this.database.connect()
  }

  public create() {
    return new Elysia()
      .onError(({ code, error, set }) => {
        switch (code) {
          case "INTERNAL_SERVER_ERROR":
            set.status = 500

            return {
              error: "Internal Server Error",
              message: error.message,
              metadata: error,
            }
          case "NOT_FOUND":
            set.status = 404

            if (process.env.URUNAN_API_ENV === "development") {
              return Response.redirect("/docs")
            }

            return Response.redirect("https://urunan.app", 307)
          case "VALIDATION":
            set.status = 422
            return {
              error: "Bad Request",
              message: JSON.parse(error.message),
              metadata: error,
            }
          case "PARSE":
            set.status = 422
            return {
              error: "Bad Request",
              message: JSON.parse(error.message),
              metadata: error,
            }
          case "INVALID_COOKIE_SIGNATURE":
            set.status = 401
            return {
              error: "Unauthorized",
              message: error.message,
              metadata: error,
            }
          default:
            set.status = 500
            return {
              error: "Internal Server Error",
              message: error.message,
              metadata: error,
            }
        }
      })
      .trace(({ onBeforeHandle, set }) => {
        onBeforeHandle(({ onStop }) => {
          onStop(({ elapsed }) => {
            set.headers["x-server-elapsed"] = elapsed.toString()
          })
        })
      })
      .use(serverTiming())
      .use(
        swagger({
          path: "/docs",
          exclude: ["/docs", "/docs/json", "/", "/health"],
          documentation: {
            openapi: "3.1.0",
            info: {
              title: "@urunan-app/api",
              description: "API documentation for @urunan-app API",
              version: "1.0.0",
            },
          },
        })
      )
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
  }
}

export const createAPIBase = () => {
  const api = new APIBase()
  return api.create()
}
