import pino, { BaseLogger } from "pino"

export class Log {
  log: BaseLogger

  constructor(key: string) {
    this.log = this.createLogger(key)
    this.createLogger(key)
  }

  protected createLogger(key: string): BaseLogger {
    return pino({
      name: key,
      level: process.env.PINO_LOG_LEVEL || "info",
      formatters: {
        bindings: (bindings) => {
          return {
            pid: key + "/" + bindings.pid,
            host: bindings.hostname,
            node: process.version,
          }
        },
        level: (label) => {
          return { level: label.toUpperCase() }
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    })
  }
}
