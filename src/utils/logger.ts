/* istanbul ignore file */
import debug from "debug"

export default class Logger {
  private debugger: debug.IDebugger

  public constructor(namespace: string) {
    this.debugger = debug(namespace)
  }

  /**
   * Defaults to log
   */
  private formatMessageWithType = (msg: string, type: string = "log") => {
    return `${type}: ${msg}`
  }

  public log = (msg: string, ...args: any[]) => {
    const type = "log"
    const message = this.formatMessageWithType(msg, type)
    return this.debugger(message, ...args)
  }
  public debug = (msg: string, ...args: any[]) => {
    const type = "debug"
    const message = this.formatMessageWithType(msg, type)
    return this.debugger(message, ...args)
  }

  public error = (msg: string, ...args: any[]) => {
    const type = "error"
    const message = this.formatMessageWithType(msg, type)
    return this.debugger(message, ...args)
  }
}
