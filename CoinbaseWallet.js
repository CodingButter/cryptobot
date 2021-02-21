const authedClient = require('./CoinBase');
const toFixed = require('tofixed');

class Wallet{
    constructor(uuid){
        this.uuid = uuid
        this.setCurrency();
    }
    async setCurrency(){

        let {currency,id} = await authedClient.getAccount(this.uuid)
        this.currency = currency
    }
    async getBalance(){
        try{
            let {available} = await authedClient.getAccount(this.uuid)
            return available;
        } catch(error){
            throw error
        }
    }
    async getMinMarketFuncts(){
        return new Promise((resolve,reject)=>{
            authedClient.getProducts()
            .then(data=>{
                return data.filter(product=>{
                    return product.id==market
                })[0]
            }).then(data=>{
                resolve({min_market_funds})
            })
        })
    }
    async buy(price,size,product_id){
        try{
            price = `'${toFixed(price,2)}'`
            let orderParams = {
                size,
                price,
                product_id
            }
            console.log({orderParams})
            return await authedClient.buy(orderParams).then(data=>{return data})
        }catch(error){
            throw error
        }
    }
    async sell(price,size,product_id){
        try{
            if(price>7)return "not enought"
            price = `'${toFixed(price,2)}'`
            let orderParams = {
                size,
                price,
                product_id
            }
            return await authedClient.sell(orderParams)
        }catch(error){
            throw error
        }
    }


}

module.exports = Wallet;
