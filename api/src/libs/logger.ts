import pino from "pino"

type LoggerType = pino.Logger
type LogLevel = "info" | "error" | "warn" | "debug" | "trace" | "fatal"

export class Log {
  private logger: LoggerType

  constructor(key: string) {
    this.logger = this.init(key)
  }

  protected init(key: string): LoggerType {
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

  log(level: LogLevel, msg: string, ...args: any[]): void {
    ;(this.logger[level] as Function)(msg, ...args)
  }

  info(msg: string, ...args: any[]): void {
    this.log("info", msg, ...args)
  }

  error(msg: string, ...args: any[]): void {
    this.log("error", msg, ...args)
  }

  warn(msg: string, ...args: any[]): void {
    this.log("warn", msg, ...args)
  }

  debug(msg: string, ...args: any[]): void {
    this.log("debug", msg, ...args)
  }

  trace(msg: string, ...args: any[]): void {
    this.log("trace", msg, ...args)
  }

  fatal(msg: string, ...args: any[]): void {
    this.log("fatal", msg, ...args)
  }

  protected getLogger(): LoggerType {
    return this.logger
  }
}
