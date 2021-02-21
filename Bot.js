const Strategies = require('./Strategies')
//const Wallet = require("./CoinbaseWallet")
const Wallet = require("./Wallet")
const Coin = require('./Coin')

const { v4: uuid } = require('uuid');
const authedClient = require('./CoinBase');
const bots = {}

class Bot{
    constructor({risk,strategy,symbol,cashWallet,coinWallet}){
        this.uuid = uuid()
        Bot.addBot(this)
        this.coin = new Coin(symbol)
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
        let {action,rsi} = this.strategy.execute(closes)
        //action = "BUY"
        let result = ""
        switch(action){
            case "BUY":
                if((this.inPosition==='START' || this.inPosition===true) && cashBalance>min_market_funds){
                    this.inPosition = false
                    let buyAmount = this.risk
                    let size = this.coin.usdToCoin(buyAmount)
                    let results = await this.coinWallet.buy(buyAmount,size,this.market)
                    result = "Bought Coin"
                }else{
                    result = "Not In Position"
                }
            break
            case "SELL":
                if((this.inPosition==='START' || this.inPosition===false) && coinBalance>0){
                    this.inPosition = true;
                    let size = coinBalance
                    let results = await this.coinWallet.sell(this.coin.coinToUSD(size),size,market)
                    result = "Sold Coins"
                }else{
                    result = "Not In Positoin"
                }
            break
            case undefined:
                 result = "No RSI Value"
            break
        }
        console.log({
            cashWallet:await this.cashWallet.getBalance(),
            coinWallet:await this.coinWallet.getBalance(),
            symbol:this.coin.symbol,
            closes:closes[closes.length-1],
            rsi,
            action,
            result
        })
    }

    updateStrategy(strategy){
        let {overBought,overSold,periods} = strategy
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
