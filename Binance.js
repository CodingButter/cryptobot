const Binance = require('node-binance-api')
const dotenv = require('dotenv').config
const APIKEY = process.env.BINANCE_API_KEY
const APISECRET = process.env.BINANCE_API_SECRET

const binance = new Binance().options({
    APIKEY,
    APISECRET
})

class Client{
     static async getKLineHistory(symbol,interval){
        return new Promise((resolve,reject)=>{
            binance.candlesticks(symbol,interval, (error, ticks, symbol) => {
                if(error)reject(error)
                resolve(ticks.map(tick=>parseFloat(tick[4])))
            }, {limit: 100});
        })
     }
    static getKLine(symbol,interval,callback){
        binance.websockets.candlesticks([symbol],interval,(candlesticks)=>{
            let {k:ticks} = candlesticks
            let {c:close,x:isFinal} = ticks
            if(isFinal){
                callback(parseFloat(close))
            }
        })
    }
 }

module.exports = Client
