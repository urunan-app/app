import { Log } from "@/libs/logger"
import { BaseLogger } from "pino"

export class Service {
  protected log: (name: string) => BaseLogger
  constructor() {
    const createLog = (name: string) => {
      const { log } = new Log(`service:${name}`)
      return log
    }
    this.log = createLog
  }
}
