import{test,expect}from '@playwright/test';
import { getFirstTradeMessage } from '../../utils/wsHelper';
import { appendLatencyJson, generateLatencyHtml } from '../../utils/delayLogger';


test.describe('Binance Tread System Delay Tests',()=>{

test('should receive at least 3 trade events within time treshold',async({},testInfo)=>{

    const Url = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

    const timestamps:number[]=[];
    for(let i=0;i<3;i++){
        //1500-fail,2000-fail,3000-fail,3500 fail,4000 fail,5000 passed
        await getFirstTradeMessage(Url,5000);
        timestamps.push(Date.now());
    }
appendLatencyJson(timestamps);
const html=generateLatencyHtml();
await testInfo.attach('Latency Chart',{
    body:html,
    contentType:'text/html'
})


    //delay 
    for (let i = 1; i < timestamps.length; i++) {
        const delay = timestamps[i] - timestamps[i - 1];
        console.log(`Message ${i}-${i + 1} delay: ${delay}ms`);
      }
const delays=timestamps.slice(1).map((t,i)=>t-timestamps[i]);

const maxDelay=Math.max(...delays);

expect(maxDelay,`Max delay ${maxDelay}MS EXCEEDS TRESHOLD`).toBeLessThan(5000);




});



});
