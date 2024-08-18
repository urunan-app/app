import { Middleware } from "../base/middleware"

export class InternalMiddleware extends Middleware {
  constructor(req: Request) {
    super(req)
  }

  isRequestInternal(): boolean {
    const token = this.req.headers.get("x-urunan-internal-token")
    return token === process.env.URUNAN_INTERNAL_TOKEN
  }
}
