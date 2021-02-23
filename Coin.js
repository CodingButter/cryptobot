//Require the Environment variables
const events = require('events')
const Client = require("./Binance")

class Coin{
    constructor(symbol,interval){
        this.symbol = symbol
        this.interval = interval
        this.events = new events.EventEmitter()
        this.setPreviousCloses()
        Client.getKLine(this.symbol,this.interval,(close)=>{
            this.addClose(close)
        })
    }
    async setPreviousCloses(){
        this.closes = await Client.getKLineHistory(this.symbol,this.interval)
    }
    addClose(close){
        this.currentClose = close;
        this.closes.push(close)
        if(this.closes.length>100)this.closes.shift()
        this.events.emit('candle_closed',this.closes)
    }
    getCloses(){
        return this.closes
    }
    usdToCoin(usd){
        return usd/this.currentClose;
    }
    coinToUSD(coin){
        return coin/this.usdToCoin(1)
    }
}

module.exports = Coin
