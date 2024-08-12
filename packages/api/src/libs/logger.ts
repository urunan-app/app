import { pino } from "pino"

export const getLogger = (name: string) => {
  return pino({
    name,
    level: process.env.PINO_LOG_LEVEL || "info",
    formatters: {
      bindings: (bindings) => {
        return {
          pid: name + "/" + bindings.pid,
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
