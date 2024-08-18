import Elysia from "elysia"
import { ProductPlatformController } from "./product-platform/product-platform.controller"

export class APIV1 {
  protected productPlatformController: ProductPlatformController

  constructor() {
    this.productPlatformController = new ProductPlatformController()
  }

  public create() {
    return new Elysia({ prefix: "/v1" }).use(
      this.productPlatformController.create()
    )
  }
}

export const createAPIV1 = () => {
  const api = new APIV1()
  return api.create()
}
