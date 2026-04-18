import { channels } from "../channeels";
import {OrderMessage} from "../../../../contracts/order-message"

export function dispatchOrderCreated(data: OrderMessage){
         return channels.orders.sendToQueue("orders", Buffer.from(JSON.stringify(data)))
}