import { orders } from "./channeels/orders";

orders.consume("orders", async message => {
       if(!message) return null
       
       console.log(message?.content.toString())
       orders.ack(message)
}, {
       noAck: false,
})