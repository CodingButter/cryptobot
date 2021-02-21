const RSIC = require('technicalindicators').RSI

class RSI{
    constructor(options){
        //The number of closes to use during calculation
        this.periods = options.periods

        //The RSI Threshold to be greater than before selling
        this.overBought = options.overBought //Example anything over 70

        //the RSI Threshold to be less than before buying
        this.overSold = options.overSold //Eample anything less than 30
    }

    execute(closes){
        //Return false if there arent enough closes
        //closes = [100,120,122,123,125,131].reverse()
        //if(closes.length<this.periods)return false

        //Calculate the RSI Value
        let calculatedRSI = this.calculate(closes)
        if(calculatedRSI <= this.overSold){
            return {action:"BUY",rsi:calculatedRSI}
        }else if(calculatedRSI >= this.overBought){
            return {action:"SELL",rsi:calculatedRSI}
        }else{
            return {action:"DO_NOTHING",rsi:calculatedRSI}
        }
    }
    calculate(closes){
        closes = closes.slice(-this.periods)
        let results =  RSIC.calculate({values:closes,period:this.periods})
        console.log(results)
        return results[results.length-1]
    }
    setOverBought(value){
        this.overBought = value
    }
    setOverSold(value){
        this.overSold = value
    }
    setPeriods(value){
        this.periods = value
    }
}

module.exports = RSI
