import type { Config } from "drizzle-kit"

export default {
  schema: "src/db/schemas",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // workaround because Bun.env.DB does not work for drizzle-kit, currently throwing ReferenceError: Bun is not defined
    url: process.env.DATABASE_URI!,
  },
} satisfies Config
