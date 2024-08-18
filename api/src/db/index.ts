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
  private developmentDB: Pool | null = null
  private productionDB: ReturnType<typeof primitiveNeon> | null = null

  constructor() {
    this.init()
    this.db = this.createDB()
  }

  private init() {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not set")
    }
    if (process.env.URUNAN_API_ENV === "development") {
      neonConfig.wsProxy = (host) => `${host}:5433/v1`
      neonConfig.useSecureWebSocket = false
      neonConfig.pipelineTLS = false
      neonConfig.pipelineConnect = false
      this.developmentDB = new Pool({
        connectionString: process.env.DATABASE_URI!,
      })
    } else {
      this.productionDB = primitiveNeon(process.env.DATABASE_URI)
    }
  }

  private createDB() {
    if (process.env.URUNAN_API_ENV === "development") {
      if (!this.developmentDB) {
        throw new Error("Development database is not initialized")
      }
      return drizzleDev(this.developmentDB, {
        schema,
        logger,
      })
    } else {
      if (!this.productionDB) {
        throw new Error("Production database is not initialized")
      }
      return drizzleProd(this.productionDB, {
        schema,
        logger,
      })
    }
  }

  public connect = async (): Promise<void> => {
    if (process.env.URUNAN_API_ENV === "development" && this.developmentDB) {
      try {
        await this.developmentDB.connect()
      } catch (e) {
        console.error("Failed to connect to development database:", e)
        throw e
      }
    }
  }
}
