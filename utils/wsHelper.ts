import { WebSocket } from "ws";

/**
 * 1)WebSocket connection to  given stream URL,
 * 2)waits for the first 'trade' event message, and returns it.
 * @param streamUrl - WebSocket URL for the Binance trade stream
 * @param timeout - maximum wait time in milliseconds (default: 8000)
 */

export async function getFirstTradeMessage(
  streamUrl: string,
  timeout: number = 8000
): Promise<any> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(streamUrl);
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error(`WebSocket timeout after ${timeout}ms`));
    }, timeout);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());
        if (data.e == "trade") {
          clearTimeout(timer);
          ws.close();
          resolve(data);
        }
      } catch (err) {
        clearTimeout(timer);
        ws.close();
        reject(err);
      }
    };
    ws.onerror = (err) => {
      clearTimeout(timer);
      ws.close();
      reject(err);
    };
  });
}
