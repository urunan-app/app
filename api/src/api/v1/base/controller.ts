import { Log } from "@/libs/logger"
import { BaseLogger } from "pino"

export class Controller {
  protected log: (name: string) => BaseLogger
  constructor() {
    this.log = (name: string) => new Log(`controller:${name}`).getLogger()
  }
}
