import Elysia, { t } from "elysia"
import { Controller } from "../base/controller"
import {
  productPlatformPayload,
  productPlatformResponse,
  productPlatformsQuery,
} from "./product-platform.schema"
import { ProductPlatformService } from "./product-platform.service"
import { InternalMiddleware } from "../middlewares/internal"

export class ProductPlatformController extends Controller {
  private service: ProductPlatformService

  constructor() {
    super()
    this.log = (name: string) => this.createLogger(`product-platform:${name}`)
    this.service = new ProductPlatformService()
  }

  protected createLogger = this.log

  create() {
    return new Elysia({ prefix: "/product-platform" })
      .decorate({
        logger: this.log,
        service: this.service,
        middleware: (request: Request) => new InternalMiddleware(request),
      })
      .get(
        "",
        async ({ query, logger, service }) => {
          try {
            logger("get").info({ query: query })
            const data = await service.getAll({
              ...query,
              key: query.key?.trim().toLocaleLowerCase(),
            })
            return {
              data: data ?? [],
              metadata: {
                message: "success",
                count: (data ?? []).length,
                limit: query.limit,
                offset: query.offset,
              },
            }
          } catch (e) {
            throw e
          }
        },
        {
          query: t.Partial(productPlatformsQuery),
          response: t.Object({
            data: t.Optional(t.Array(productPlatformResponse)),
            metadata: t.Object({
              message: t.String(),
              count: t.Numeric(),
            }),
          }),
        }
      )
      .post(
        "",
        async ({ body, logger, service }) => {
          try {
            logger("create").info({
              body: {
                ...body,
                key: body.key.trim().toLocaleLowerCase().replace(" ", "-"),
              },
            })
            const data = await service.create(body)

            return {
              data,
              metadata: {
                message: "success",
              },
            }
          } catch (e) {
            throw e
          }
        },
        {
          body: productPlatformPayload,
          response: t.Object({
            data: t.Nullable(productPlatformResponse),
            metadata: t.Object({
              message: t.String(),
            }),
          }),
          beforeHandle: (ctx) => {
            const isInternal = ctx.middleware(ctx.request).isRequestInternal()

            if (!isInternal) {
              ctx.set.status = 401
              return {
                data: null,
                metadata: {
                  message: "Unauthorized",
                },
              }
            }
          },
        }
      )
      .get(
        "/:id",
        async ({ params, logger, service }) => {
          try {
            logger("getOneById").info({ params })
            const data = await service.getOne({ id: params.id.trim() })
            if (!data || data.length === 0) {
              return {
                data: null,
                metadata: {
                  message: "Not Found",
                },
              }
            }
            return {
              data: data[0],
              metadata: {
                message: "success",
              },
            }
          } catch (e) {
            throw e
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          response: t.Object({
            data: t.Nullable(productPlatformResponse),
            metadata: t.Object({
              message: t.String(),
            }),
          }),
        }
      )
      .patch(
        "/:id",
        async ({ params, body, logger, service }) => {
          try {
            logger("updateOne").info({ params, body })
            await service.updateOne({ id: params.id }, body)

            return {
              metadata: {
                message: "success",
              },
            }
          } catch (e) {
            throw e
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: t.Partial(productPlatformPayload),
          response: t.Object({
            metadata: t.Object({
              message: t.String(),
            }),
          }),
          beforeHandle: (ctx) => {
            const isInternal = ctx.middleware(ctx.request).isRequestInternal()

            if (!isInternal) {
              ctx.set.status = 401
              return {
                metadata: {
                  message: "Unauthorized",
                },
              }
            }
          },
        }
      )
      .delete(
        "/:id",
        async ({ params, logger, service }) => {
          try {
            logger("deleteOne").info({ params })
            await service.deleteOne({ id: params.id })

            return {
              metadata: {
                message: "success",
              },
            }
          } catch (e) {
            throw e
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          response: t.Object({
            metadata: t.Object({
              message: t.String(),
            }),
          }),
          beforeHandle: (ctx) => {
            const isInternal = ctx.middleware(ctx.request).isRequestInternal()

            if (!isInternal) {
              ctx.set.status = 401
              return {
                metadata: {
                  message: "Unauthorized",
                },
              }
            }
          },
        }
      )
      .post(
        "/:id/restore",
        async ({ params, logger, service }) => {
          try {
            logger("restoreOne").info({ params })
            await service.restoreOne({ id: params.id })

            return {
              metadata: {
                message: "success",
              },
            }
          } catch (e) {
            throw e
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          response: t.Object({
            metadata: t.Object({
              message: t.String(),
            }),
          }),
          beforeHandle: (ctx) => {
            const isInternal = ctx.middleware(ctx.request).isRequestInternal()

            if (!isInternal) {
              ctx.set.status = 401
              return {
                metadata: {
                  message: "Unauthorized",
                },
              }
            }
          },
        }
      )
  }
}
