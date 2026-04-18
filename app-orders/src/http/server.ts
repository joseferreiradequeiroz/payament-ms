import "dotenv/config"
import "@opentelemetry/auto-instrumentations-node/register"
import { fastify } from 'fastify'
import fastifyCors from "@fastify/cors"
import { z } from "zod" 
import { 
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
 } from "fastify-type-provider-zod"
import { db } from '../db/client'
import { trace } from "@opentelemetry/api"
import { orders } from '../db/schemas'
import { dispatchOrderCreated } from '../broker/messages/order_created'
import { randomUUID } from 'node:crypto'
import { tracer } from "../tracer/tracer"
import { setTimeout } from "node:timers/promises"

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
       origin: "*",
})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get("/health", () => {
       return 'OK'
}
)

app.post('/orders', {
       schema: {
              body: z.object({
                     amount: z.coerce.number(),
              })
       }
}, async (req, reply) =>{
       const { amount } = req.body
     
       const customerId = randomUUID()

        dispatchOrderCreated({ 
              customerId,
              amount,
              orderId: "fc47ddf4-1094-4d8e-ab85-1a177406db3d"
        })
     
       await db.insert(orders).values({
              id: crypto.randomUUID(),
              customerId: "fc47ddf4-1094-4d8e-ab85-1a177406db3d",
              amount
       })


       const span = tracer.startSpan("eu acho que aqui tá dando merda")

       await setTimeout(2000)

       span.end()

       trace.getActiveSpan()?.setAttribute('order_id', "fc47ddf4-1094-4d8e-ab85-1a177406db3d")

       return reply.status(201).send({

       })
})

app.listen({host: '0.0.0.0', port: 3333}).then(() => {
  console.log('[ORDERS] HTTP server running on http://localhost:3333')
})