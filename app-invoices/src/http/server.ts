import "dotenv/config"
import "@opentelemetry/auto-instrumentations-node/register"
import { fastify } from 'fastify'
import fastifyCors from "@fastify/cors"
import { 
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
 } from "fastify-type-provider-zod"
import "../broker/subscriber"


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

app.listen({host: '0.0.0.0', port: 3000}).then(() => {
  console.log('[INVOICES] HTTP server running on http://localhost:3000')
})