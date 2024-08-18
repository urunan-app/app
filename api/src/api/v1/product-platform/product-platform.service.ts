import { Service } from "@/api/v1/base/service"
import { ProductPlatformRepository } from "./product-platform.repository"
import {
  PartialProductPlatformPayload,
  ProductPlatformPayload,
  ProductPlatformQuery,
  ProductPlatformsQuery,
} from "./product-platform.schema"

export class ProductPlatformService extends Service {
  private repository: ProductPlatformRepository

  constructor() {
    super()
    this.log = (name: string) => this.createLogger(`product-platform:${name}`)
    this.repository = new ProductPlatformRepository()
  }

  protected createLogger = this.log

  async create(payload: ProductPlatformPayload) {
    const checkIfExist = await this.repository.checkExistKey(payload.key)

    if (checkIfExist) {
      throw new Error(`Product platform with key ${payload.key} already exist`)
    }

    return this.repository.create(payload)
  }

  getAll(query: ProductPlatformsQuery) {
    return this.repository.getAll(query)
  }

  async getOne(query: ProductPlatformQuery) {
    this.log("getOneById").info({ id: query.id })
    const data = await this.repository.getOneById(query.id.trim())

    if (data.length === 0) return null

    return data
  }

  updateOne(
    query: ProductPlatformQuery,
    payload: PartialProductPlatformPayload
  ) {
    return this.repository.updateOne(query, payload)
  }

  async deleteOne(query: ProductPlatformQuery) {
    const checkIfDeleted = await this.repository.checkIfDeleted(query)

    if (checkIfDeleted) {
      throw new Error(`Product platform with id ${query.id} is already deleted`)
    }

    return this.repository.deleteOne(query)
  }

  async restoreOne(query: ProductPlatformQuery) {
    const checkIfDeleted = await this.repository.checkIfDeleted(query)

    if (checkIfDeleted) {
      return this.repository.restoreOne(query)
    }

    throw new Error(`Product platform with id ${query.id} is not deleted`)
  }
}
