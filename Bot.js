const Strategies = require('./Strategies')
const Wallet = require("./CoinbaseWallet")
const Coin = require('./Coin')

const { v4: uuid } = require('uuid');
const authedClient = require('./Coinbase');
const bots = {}

class Bot{
    constructor({strategy,symbol,cashWallet,coinWallet}){
        this.uuid = uuid()
        Bot.addBot(this)
        this.coin = new Coin(symbol)
        this.cashWallet = new Wallet(cashWallet)
        this.coinWallet = new Wallet(coinWallet)
        this.inPosition = true
        this.STRAT = Strategies[strategy.type]
        this.strategy = new this.STRAT(strategy.options)
        this.coin.events.on('candle_closed',(closes)=>this.candleClosed(closes))
    }

    async candleClosed(closes){
        let cashBalance = parseFloat(await this.cashWallet.getBalance());
        let coinBalance = parseFloat(await this.coinWallet.getBalance());
        let market = this.coinWallet.currency + "-" + this.cashWallet.currency
        let {min_market_funds} = await authedClient.getProducts()
        .then(data=>{
            return data.filter(product=>{
                return product.id==market
            })[0]
        }).then(data=>data)
        min_market_funds = parseFloat(min_market_funds)
        let {action} = this.strategy.execute(closes)
        switch(action){
            case "BUY":
                if(this.inPosition && cashBalance>min_market_funds){
                    this.inPosition = false
                    let buyAmount = 10 //cashBalance/2
                    let size = this.coin.usdToCoin(buyAmount)
                    let results = await this.coinWallet.buy(buyAmount,size,market)
                    console.log(results)
                    /**
                    *@TODO Add Buy Logic
                    **/
                }
            break
            case "SELL":
                if(!this.inPosition){
                    this.inPosition = true;
                    let size = coinBalance
                    let results = await this.cionWallet.sell(this.coin.coinToUSD(sellAmount),size,market)
                    console.log(results)
                    /**
                    *@TODO Add Sell Logic
                    **/
                }
            break
            case false:
                /**
                 *@TODO Atleast Respond for log purposes
                 **/
            break
        }
        console.log({
            cashWallet:await this.cashWallet.getBalance(),
            coinWallet:await this.coinWallet.getBalance(),
            symbol:this.coin.symbol,
            closes:closes[closes.length-1],
            RSI:action
        })
    }
    updateStrategy(strategy){
        let {overBought,overSold,periods} = strategy
        console.log({periods})
        this.setOverBought(overBought);
        this.setOverSold(overSold);
        this.setPeriods(periods);
    }
    setOverBought(value){
        if(value)
        this.strategy.setOverBought(value)
    }
    setOverSold(value){
        if(value)
        this.strategy.setOverSold(value)
    }
    setPeriods(value){
        if(value)
        this.strategy.setPeriods(value)
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
