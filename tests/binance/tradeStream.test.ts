import {test,expect} from '@playwright/test';
import {BinanceTradeMessage}from '../../types/binance';
import { WebSocket } from 'ws';



//Binance BTC/USDT trade WebSocket URL
const wsUrl='wss://stream.binance.com:9443/ws/btcusdt@trade';

test('Binance trade stream should return valid trade data',async({})=>{

    test.setTimeout(10000);

    const ws =new WebSocket(wsUrl);

    const tradeMessage=await new Promise<BinanceTradeMessage> ((resolve,reject)=>{

        const timer =setTimeout(()=>reject('Websocket timeout!'),8000);

        ws.onmessage=(event)=>{

            const data = JSON.parse(event.data);
            console.log('incoming data',data)
            if (data.e==='trade')
            {
                clearTimeout(timer);
                resolve(data);
                ws.close();
            }
        };
        ws.onerror=(error)=>{
            clearTimeout(timer);
        reject('WebSocket error:' + error);
    };


    });

    expect(tradeMessage).toHaveProperty('e','trade');//event type
    expect(tradeMessage).toHaveProperty('s','BTCUSDT');//symbol
    expect(tradeMessage).toHaveProperty('p');//price
    expect(Number(tradeMessage.p)).toBeGreaterThan(0);      // Price should be > 0









})