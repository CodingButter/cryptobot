const fs = require('fs')
const { v4: uuid } = require('uuid');
const toFixed = require('tofixed');

const path = require('path');
const WALLET_PATH = path.join(__dirname,'wallets')

class Wallet{
    constructor(uuid,cashWallet){
        this.uuid = uuid
        this.cashWallet = cashWallet
    }

    writeBalance(coinBalance,cashBalance){
        fs.writeFileSync(path.join(WALLET_PATH,this.uuid),toFixed(coinBalance,8))
        fs.writeFileSync(path.join(WALLET_PATH,this.cashWallet.uuid),toFixed(cashBalance,8))
    }

    async getMinMarketFunds(){
        return new Promise((resolve,reject)=>{
            resolve('0.0000001')
        })
    }

    async buy(buyAmount,size){
        return new Promise(async (resolve,reject)=>{
            let newBalance = parseFloat(await this.getBalance()) + parseFloat(size)
            let cashBalance = parseFloat(await this.cashWallet.getBalance()) - parseFloat(buyAmount)
            this.writeBalance(newBalance,cashBalance)
            resolve({status:"success"})
        })
    }

    async sell(sellAmount,size){
        return new Promise(async (resolve,reject)=>{
            let newBalance = parseFloat(await this.getBalance()) - parseFloat(size);
            let cashBalance = parseFloat(await this.cashWallet.getBalance()) + parseFloat(sellAmount)
            this.writeBalance(newBalance,cashBalance)
            resolve({status:"success"})
        })
    }

    async getBalance(){
        return new Promise((resolve,reject)=>{
           resolve(String(parseFloat(fs.readFileSync(path.join(WALLET_PATH,this.uuid),'utf8'))));
        })
    }
}

module.exports = Wallet;
