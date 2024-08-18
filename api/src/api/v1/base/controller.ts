import { Log } from "@/libs/logger"
import { BaseLogger } from "pino"

export class Controller {
  protected log: (name: string) => BaseLogger
  constructor() {
    const createLog = (name: string) => {
      const { log } = new Log(`controller:${name}`)
      return log
    }
    this.log = createLog
  }
}
