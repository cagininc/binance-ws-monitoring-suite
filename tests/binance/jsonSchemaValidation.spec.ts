import {test,expect}from "@playwright/test";
import Ajv from "ajv";
import { tradeMessageSchema } from '../../schemas/tradeMessageSchema';
import { WebSocket } from 'ws';


test('Trade message should match JSON schema',async()=>{
const wsUrl='wss://stream.binance.com:9443/ws/btcusdt@trade';

 const ws=new WebSocket(wsUrl);
 const message:any=await new Promise(resolve=>{

ws.onmessage= e=>{resolve(JSON.parse(e.data)); ws.close();};

 })

 const validate=new Ajv().compile(tradeMessageSchema);
 expect(validate(message)).toBe(true);








});