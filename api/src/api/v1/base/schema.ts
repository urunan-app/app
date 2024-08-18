import { t } from "elysia"

export const queryAllBasePayloadSchema = t.Object({
  limit: t.Optional(t.Numeric({ minimum: 1 })),
  offset: t.Optional(t.Numeric({ minimum: 0 })),
})
