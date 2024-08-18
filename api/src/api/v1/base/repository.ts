import { Database } from "@/db"
import { Log } from "@/libs/logger"
import { BaseLogger } from "pino"

export class Repository {
  protected db: Database["db"]
  protected log: (name: string) => BaseLogger

  constructor() {
    const { db } = new Database()
    const createLog = (name: string) => {
      const { log } = new Log(`repository:${name}`)
      return log
    }
    this.log = createLog
    this.db = db
  }
}
