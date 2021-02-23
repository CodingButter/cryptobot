class Strategy{
    constructor(options,strategy){
        this.options = options
        this.strategy = strategy
    }

    update(options){
        this.options = {
            ...this.options,
            options
        }
    }

    execute(){
        console.warn("Must have execute method")
    }

    calculate(values){
        let options = {
            ...this.options,
            values
        }
        return  this.strategy.calculate(options)
    }
}

module.exports = Strategy
