
import Ajv,{JSONSchemaType, Schema} from 'ajv';
import{BinanceTradeMessage} from '../types/binance'


export const tradeMessageSchema:Schema={


type:'object',
properties: {
    e: { type: 'string' },
    E: { type: 'number' },
    s: { type: 'string' },
    t: { type: 'number' },
    p: { type: 'string' },
    q: { type: 'string' },
    T: { type: 'number' },
    m: { type: 'boolean' },
    M: { type: 'boolean' },
  },
  required: ['e','E','s','t','p','q','T','m','M'],
  additionalProperties: false,



}