import { createInsertSchema, createSelectSchema } from "drizzle-typebox"
import { t, type Static } from "elysia"
import { queryAllBasePayloadSchema } from "@/api/v1/base/schema"
import { productPlatformSchema } from "@/db/schemas"

export const productPlatformInsert = createInsertSchema(productPlatformSchema)
export const productPlatformSelect = createSelectSchema(productPlatformSchema)

export type ProductPlatformInsert = Static<typeof productPlatformInsert>
export type ProductPlatformSelect = Static<typeof productPlatformSelect>

export const productPlatformBase = t.Pick(productPlatformInsert, [
  "name",
  "key",
  "logo",
  "url",
  "description",
])

export const productPlatformPayload = productPlatformBase
export type ProductPlatformPayload = Static<typeof productPlatformPayload>

export const partialProductPlatformPayload = t.Partial(productPlatformBase)
export type PartialProductPlatformPayload = Static<
  typeof partialProductPlatformPayload
>

export const productPlatformResponse = t.Omit(productPlatformSelect, [
  "isDeleted",
  "deletedAt",
])
export type ProductPlatformResponse = Static<typeof productPlatformResponse>
export type ProductPlatform = ProductPlatformResponse

export const productPlatformsQuery = t.Composite([
  queryAllBasePayloadSchema,
  t.Partial(t.Pick(productPlatformBase, ["key"])),
])
export type ProductPlatformsQuery = Static<typeof productPlatformsQuery>

export const productPlatformQuery = t.Pick(productPlatformSelect, ["id"])
export type ProductPlatformQuery = Static<typeof productPlatformQuery>
