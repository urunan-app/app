import { API_DEFAULT } from "@/api/v1/base/constants"
import { productPlatformSchema } from "@/db/schemas"
import { flattenError } from "@/utils/error"
import { and, desc, eq, sql } from "drizzle-orm"
import { createId } from "@/utils/id"
import { Repository } from "@/api/v1/base/repository"
import {
  PartialProductPlatformPayload,
  ProductPlatformInsert,
  ProductPlatformPayload,
  ProductPlatformQuery,
  ProductPlatformsQuery,
} from "./product-platform.schema"

export class ProductPlatformRepository extends Repository {
  constructor() {
    super()
    this.log = (name: string) => this.createLogger(`product-platform:${name}`)
    this.db = this.createDatabase()
  }

  protected createDatabase() {
    return this.db
  }

  protected createLogger = this.log

  async create(payload: ProductPlatformPayload) {
    const logId = "create"
    const data: ProductPlatformInsert = {
      ...payload,
      id: createId("upp"),
    }

    try {
      const newData = await this.db
        .insert(productPlatformSchema)
        .values(data)
        .returning()

      this.log(logId).info("Success")

      return {
        id: newData[0].id,
        name: newData[0].name,
        key: newData[0].key,
        logo: newData[0].logo,
        url: newData[0].url,
        description: newData[0].description,
        isActive: newData[0].isActive,
        updatedAt: newData[0].updatedAt,
        createdAt: newData[0].createdAt,
      }
    } catch (e) {
      const err = flattenError(e)
      this.log(logId).error(err)
      throw new Error(err)
    }
  }

  async checkExistKey(key: string) {
    const logId = "checkExistKey"
    const existKeyItemSQL = this.selectOne()
      .where(
        and(
          eq(productPlatformSchema.key, sql.placeholder(`key`)),
          eq(productPlatformSchema.isDeleted, false)
        )
      )
      .limit(1)
      .prepare("product-platform-create-check-exist-key")

    const existKeyItem = await existKeyItemSQL.execute({
      key: key,
    })

    if (existKeyItem.length > 0) {
      const err = `Key ${key} already exists`
      this.log(logId).error(err)
      return true
    }

    return false
  }

  async getAll(q: ProductPlatformsQuery) {
    const logId = "getAll"
    try {
      let query = this.db
        .select({
          id: productPlatformSchema.id,
          name: productPlatformSchema.name,
          key: productPlatformSchema.key,
          logo: productPlatformSchema.logo,
          url: productPlatformSchema.url,
          description: productPlatformSchema.description,
          isActive: productPlatformSchema.isActive,
          updatedAt: productPlatformSchema.updatedAt,
          createdAt: productPlatformSchema.createdAt,
        })
        .from(productPlatformSchema)

      if (q.key) {
        query.where(
          and(
            eq(productPlatformSchema.key, q.key),
            eq(productPlatformSchema.isDeleted, false)
          )
        )
      } else {
        query.where(eq(productPlatformSchema.isDeleted, false))
      }

      const allData = await query
        .orderBy(desc(productPlatformSchema.createdAt))
        .limit(q.limit || API_DEFAULT["LIMIT_QUERY"])
        .offset(q.offset || API_DEFAULT["OFFSET_QUERY"])

      this.log(logId).info("Success")

      return allData
    } catch (e) {
      const err = flattenError(e)
      this.log(logId).error(err)
      throw new Error(err)
    }
  }

  async getOneById(id: string) {
    const logId = "getOneById"
    try {
      const getOneByIdSQL = this.db
        .select({
          id: productPlatformSchema.id,
          name: productPlatformSchema.name,
          key: productPlatformSchema.key,
          logo: productPlatformSchema.logo,
          url: productPlatformSchema.url,
          description: productPlatformSchema.description,
          isActive: productPlatformSchema.isActive,
          updatedAt: productPlatformSchema.updatedAt,
          createdAt: productPlatformSchema.createdAt,
        })
        .from(productPlatformSchema)
        .where(
          and(
            eq(productPlatformSchema.id, sql.placeholder(`id`)),
            eq(productPlatformSchema.isDeleted, false)
          )
        )
        .prepare("product-platform-get-one-by-id")

      const data = await getOneByIdSQL.execute({
        id: id,
      })

      this.log(logId).info("Success")

      return data
    } catch (e) {
      const err = flattenError(e)
      this.log(logId).error(err)
      throw new Error(err)
    }
  }

  async getOneByKey(key: string) {
    const logId = "getOneByKey"
    try {
      const getOneByKeySQL = this.db
        .select({
          id: productPlatformSchema.id,
          name: productPlatformSchema.name,
          key: productPlatformSchema.key,
          logo: productPlatformSchema.logo,
          url: productPlatformSchema.url,
          description: productPlatformSchema.description,
          isActive: productPlatformSchema.isActive,
          updatedAt: productPlatformSchema.updatedAt,
          createdAt: productPlatformSchema.createdAt,
        })
        .from(productPlatformSchema)
        .where(eq(productPlatformSchema.key, sql.placeholder(`key`)))
        .prepare("product-platform-get-one-by-key")

      const data = await getOneByKeySQL.execute({
        key: key,
      })

      this.log(logId).info("Success")

      return data
    } catch (e) {
      const err = flattenError(e)
      this.log(logId).error(err)
      throw new Error(err)
    }
  }

  async updateOne(
    q: ProductPlatformQuery,
    payload: PartialProductPlatformPayload
  ) {
    const logId = "updateOne"
    try {
      await this.db
        .update(productPlatformSchema)
        .set({ ...payload, updatedAt: new Date(Date.now()) })
        .where(eq(productPlatformSchema.id, q.id))

      return this.log(logId).info("Success")
    } catch (e) {
      const err = flattenError(e)
      this.log(logId).error(err)
      throw new Error(err)
    }
  }

  async deleteOne(q: ProductPlatformQuery) {
    const logId = "deleteOne"
    try {
      const deleteOneSQL = this.db
        .update(productPlatformSchema)
        .set({
          isDeleted: true,
          isActive: false,
          updatedAt: new Date(Date.now()),
          deletedAt: new Date(Date.now()),
        })
        .where(eq(productPlatformSchema.id, sql.placeholder(`id`)))

      await deleteOneSQL.execute({
        id: q.id,
      })

      return this.log(logId).info("Success")
    } catch (e) {
      const err = flattenError(e)
      this.log(logId).error(err)
      throw new Error(err)
    }
  }

  async checkIfDeleted(q: ProductPlatformQuery) {
    const query = this.selectOne().where(
      and(
        eq(productPlatformSchema.id, sql.placeholder(`id`)),
        eq(productPlatformSchema.isDeleted, true)
      )
    )

    const deletedItems = await query.execute({ id: q.id })

    if (deletedItems.length > 0) {
      return true
    }

    return false
  }

  async restoreOne(q: ProductPlatformQuery) {
    const logId = "restoreOne"
    try {
      const query = this.db
        .update(productPlatformSchema)
        .set({
          isDeleted: false,
          isActive: true,
          updatedAt: new Date(Date.now()),
          deletedAt: null,
        })
        .where(eq(productPlatformSchema.id, sql.placeholder(`id`)))
        .returning()

      await query.execute({
        id: q.id,
      })

      return this.log(logId).info("Success")
    } catch (e) {
      const err = e instanceof Error ? e.message : JSON.stringify(e)
      this.log(logId).error(err)
      throw new Error(err)
    }
  }

  protected selectOne() {
    return this.db
      .select({
        id: productPlatformSchema.id,
      })
      .from(productPlatformSchema)
  }
}
