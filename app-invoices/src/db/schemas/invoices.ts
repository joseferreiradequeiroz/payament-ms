import { pgEnum } from "drizzle-orm/pg-core"
import { timestamp } from "drizzle-orm/pg-core"
import { text } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"


export const OrderStatusEnum = pgEnum("order_status", ["pending", "paid", "cancelled"])

export const invoices = pgTable('invoices', {
       id: text().primaryKey(),
       orderId: text().notNull(),
       createdAt: timestamp().notNull().defaultNow()
})