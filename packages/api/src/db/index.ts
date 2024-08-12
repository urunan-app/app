import { drizzle as drizzleDev } from "drizzle-orm/neon-serverless"
import * as schema from "./schemas"

import {
  neonConfig,
  Pool,
  neon as primitiveNeon,
} from "@neondatabase/serverless"
import { drizzle as drizzleProd } from "drizzle-orm/neon-http"
import { logger } from "./logger"

export class Database {
  public db: ReturnType<typeof drizzleDev> | ReturnType<typeof drizzleProd>
  protected developmentDB: Pool
  protected productionDB: ReturnType<typeof primitiveNeon>
  constructor() {
    this.init()
    this.developmentDB = new Pool({
      connectionString: process.env.DATABASE_URI,
    })
    this.productionDB = primitiveNeon(process.env.DATABASE_URI!)
    this.db = this.createDB()
  }

  protected init() {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not set")
    }

    if (process.env.URUNAN_API_ENV === "development") {
      neonConfig.wsProxy = (host) => `${host}:5433/v1`
      neonConfig.useSecureWebSocket = false
      neonConfig.pipelineTLS = false
      neonConfig.pipelineConnect = false
    }
  }

  protected createDB() {
    return process.env.URUNAN_API_ENV === "development"
      ? drizzleDev(this.developmentDB, {
          schema,
          logger,
        })
      : drizzleProd(this.productionDB, {
          schema,
          logger,
        })
  }

  public async connect() {
    if (process.env.URUNAN_API_ENV === "development") {
      try {
        await this.developmentDB.connect()
      } catch (e) {
        throw e
      }
    }
  }
}

export default db
