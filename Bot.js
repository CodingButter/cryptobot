const Strategies = require('./Strategies')
//const Wallet = require("./CoinbaseWallet")
const Wallet = require("./Wallet")
const Coin = require('./Coin')

const { v4: uuid } = require('uuid');
const authedClient = require('./CoinBase');
const bots = {}

class Bot{
    constructor({risk,strategy,symbol,cashWallet,coinWallet,interval}){
        this.uuid = uuid()
        Bot.addBot(this)
        this.coin = new Coin(symbol,interval)
        this.cashWallet = new Wallet(cashWallet)
        this.coinWallet = new Wallet(coinWallet,this.cashWallet)
        this.market = this.coinWallet.currency + "-" + this.cashWallet.currency
        this.inPosition = 'START'
        this.strategy = new Strategies[strategy.type](strategy.options)
        this.risk = risk
        this.coin.events.on('candle_closed',(closes)=>this.candleClosed(closes))
    }

    async candleClosed(closes){
        let cashBalance = parseFloat(await this.cashWallet.getBalance());
        let coinBalance = parseFloat(await this.coinWallet.getBalance());
        let min_market_funds = await this.coinWallet.getMinMarketFunds();
        let {action,indicator} = this.strategy.execute(closes)
        //action = "BUY"
        let result = ""
        switch(action){
            case "BUY":
                if((this.inPosition==='START' || this.inPosition===true) && cashBalance>min_market_funds){
                    this.inPosition = false
                    let buyAmount = this.risk
                    let size = this.coin.usdToCoin(buyAmount)
                    let results = await this.coinWallet.buy(buyAmount,size,this.market)
                    result = "BOUGHT"
                }else{
                    result = "NO_POSITION"
                }
            break
            case "SELL":
                if((this.inPosition==='START' || this.inPosition===false) && coinBalance>0){
                    this.inPosition = true;
                    let size = coinBalance
                    let results = await this.coinWallet.sell(this.coin.coinToUSD(size),size,this.market)
                    result = "SOLD"
                }else{
                    result = "NO_POSITION"
                }
            break
            case "DO_NOTHING":
                 result = "NO_INDICATOR"
            break
        }
        let taken = {
            cashWallet:await this.cashWallet.getBalance(),
            coinWallet:await this.coinWallet.getBalance(),
            symbol:this.coin.symbol,
            closes:closes[closes.length-1],
            indicator,
            action,
            result
        }
        console.log({taken})
    }

    update(options){
        this.strategy.update(options)
    }
    getUUID(){
        return this.uuid
    }
    static getBot(uuid){
        return bots[uuid]
    }
    static addBot(bot){
        bots[bot.uuid] = bot
   }
}

module.exports = Bot
