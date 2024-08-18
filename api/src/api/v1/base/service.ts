import { Log } from "@/libs/logger"
import { BaseLogger } from "pino"

export class Service {
  protected log: (name: string) => BaseLogger
  constructor() {
    this.log = (name: string) => new Log(`service:${name}`).getLogger()
  }
}
