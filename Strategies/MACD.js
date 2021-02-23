const Strategy = require('./Strategy')
const MACDC = require('technicalindicators').MACD

class MACD extends Strategy{
    constructor(options){
        super(options,MACDC)
        console.log(this.options)
    }

    execute(closes){
        let results = this.calculate(closes).pop()
        let {histogram:indicator}  = results
        if(indicator < 0){
            return {action:"BUY",indicator}
        }else if(indicator > 0){
            return {action:"SELL",indicator}
        }else{
            return {action:"DO_NOTHING",indicator}
        }
    }
}
module.exports = MACD
