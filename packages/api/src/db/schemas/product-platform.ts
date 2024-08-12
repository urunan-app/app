import { sql } from "drizzle-orm"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const productPlatformSchema = pgTable(
  "product_platform",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    key: text("key").notNull(),
    logo: text("logo"),
    url: text("url"),
    description: text("description"),

    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .default(sql`now()`),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .default(sql`now()`),
    deletedAt: timestamp("deleted_at", {
      withTimezone: true,
      mode: "date",
    }),
  },
  (table) => {
    return {
      idIdx: index("id_idx").on(table.id),
      keyIdx: uniqueIndex("key_idx").on(table.key),
    }
  }
)
