const fs = require('fs')
const { v4: uuid } = require('uuid');

const path = require('path');
const WALLET_PATH = path.join(__dirname,'wallets')

class Wallet{
    constructor(uuid){
        this.balance = 0;
        this.setWallet(uuid)
    }

    setWallet(uuid){
        if(uuid==undefined){
            this.createWallet()
        }else{
            this.uuid = uuid
            this.openWallet()
        }
    }

    createWallet(){
        this.uuid = uuid()
        this.updateWallet()
    }

    openWallet(){
        this.balance = parseFloat(fs.readFileSync(path.join(WALLET_PATH,this.uuid),'utf8'));
    }

    updateWallet(){
        fs.writeFileSync(path.join(WALLET_PATH,this.uuid),parseFloat(this.balance))

    }

    fill(amount){
        this.setBalance(this.getBalance()+amount)
        return this.getBalance()
    }

    emptyAll(){
        return this.empty(this.getBalance())
    }

    empty(amount){
        this.setBalance(this.getBalance()-amount);
        return this.getBalance()
    }


    getBalance(){
        this.openWallet()
        return this.balance;
    }

    setBalance(amount){
        this.balance = amount
        this.updateWallet()
    }
}

module.exports = Wallet;
