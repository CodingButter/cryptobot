const Strategies = require('./Strategies')
const Coinbase = require('./CoinbaseClient')
const Wallet = require("./Wallet")
const Coin = require('./Coin')

const { v4: uuid } = require('uuid');
const bots = {}

class Bot{
    constructor({strategy,symbol,cashWallet,coinWallet}){
        this.uuid = uuid()
        Bot.addBot(this)
        this.coin = new Coin(symbol)
        this.cashWallet = new Wallet(cashWallet)
        this.coinWallet = new Wallet(coinWallet)
        this.inPosition = this.cashWallet.getBalance()>10?true:false;
        this.STRAT = Strategies[strategy.type]
        this.strategy = new this.STRAT(strategy.options)
        this.coin.events.on('candle_closed',(closes)=>this.candleClosed(closes))
    }

    candleClosed(closes){
        let cashBalance = this.cashWallet.getBalance();
        let coinBalance = this.coinWallet.getBalance();

        let response = this.strategy.execute(closes)
        switch(response.action){
            case "BUY":
                if(this.inPosition){
                    this.inPosition = false
                    let buyAmount = cashBalance/2
                    this.cashWallet.empty(buyAmount)
                    this.coinWallet.fill(this.coin.usdToCoin(buyAmount))

                    /**
                    *@TODO Add Buy Logic
                    **/
                }
            break
            case "SELL":
                if(!this.inPosition){
                    this.inPosition = true;
                    this.coinWallet.emptyAll()
                    this.cashWallet.fill(this.coin.coinToUSD(coinBalance))
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
            cashWallet:this.cashWallet.getBalance(),
            coinWallet:this.coinWallet.getBalance(),
            symbol:this.coin.symbol,
            closes:closes[closes.length-1],
            RSI:response
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
