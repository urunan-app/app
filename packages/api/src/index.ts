import { Elysia, t } from "elysia"

const app = new Elysia()
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

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
