export interface BinanceTradeMessage {
    e: string;   // event type
    E: number;   // event time
    s: string;   // symbol
    t: number;   // trade ID
    p: string;   // price
    q: string;   // quantity
    T: number;   // trade time
    m: boolean;  // is buyer maker
    M: boolean;  // ignore flag
    [key: string]: any; 
  }