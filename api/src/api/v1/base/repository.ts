import { Database } from "@/db"
import { Log } from "@/libs/logger"
import { BaseLogger } from "pino"

export class Repository {
  protected db: Database["db"]
  protected log: (name: string) => BaseLogger

  constructor() {
    const { db } = new Database()
    this.log = (name: string) => new Log(`repository:${name}`).getLogger()
    this.db = db
  }
}
