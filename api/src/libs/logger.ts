import pino, { BaseLogger } from "pino"

type LoggerType = pino.Logger
type LogLevel = "info" | "error" | "warn" | "debug" | "trace" | "fatal"

export class Log {
  getLogger: () => BaseLogger

  constructor(key: string) {
    this.getLogger = () => this.createLogger(key)
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
