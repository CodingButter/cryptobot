const Strategy = require('./Strategy')
const RSIC = require('technicalindicators').RSI

class RSI extends Strategy{
    constructor(options){
       super(options,RSIC)
    }

    execute(closes){
        let indicator = this.calculate(closes).pop()
        if(indicator <= this.options.overSold){
            return {action:"BUY",indicator}
        }else if(indicator >= this.options.overBought){
            return {action:"SELL",indicator}
        }else{
            return {action:"DO_NOTHING",indicator}
        }
    }
}
module.exports = RSI
