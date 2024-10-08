import { Log } from "@/libs/logger"
import { APIBase } from "./base"
import { APIV1 } from "./v1"

export class API {
  protected api: APIBase
  protected v1: APIV1

  constructor() {
    this.api = new APIBase()
    this.v1 = new APIV1()
  }
  public create() {
    return this.api.create().use(this.v1.create())
  }
}

export const createAPI = (key?: string) => {
  const { log } = new Log(key || "api")
  const api = new API()
  return { api: api.create(), log }
}
