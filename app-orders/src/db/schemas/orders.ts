import { pgEnum } from "drizzle-orm/pg-core"
import { timestamp } from "drizzle-orm/pg-core"
import { integer, text } from "drizzle-orm/pg-core"
import { pgTable } from "drizzle-orm/pg-core"
import { customers } from "./customer"

export const OrderStatusEnum = pgEnum("order_status", ["pending", "paid", "cancelled"])

export const orders = pgTable('orders', {
       id: text().primaryKey(),
       customerId: text().notNull().references(() => customers.id),
       amount: integer().notNull(),
       status: OrderStatusEnum().notNull().default("pending"),
       createdAt: timestamp().notNull().defaultNow()
})