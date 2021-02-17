//Require the Environment variables
const dotenv = require('dotenv').config();
const SOCKET = process.env.SOCKET;

const events = require('events')

//Require websocket client
const WebSocketClient = require('websocket').client;

const clients =  {};


const createClient = (coin)=>{

    //Check if we already have a websocket connected for this coin
    if(clients[coin.symbol]){
        coin.setClient(clients[coin.symbol])
    }
    let client = new WebSocketClient()
    clients[coin] = client;

    client.on('connectFailed',(error)=>{
        coin.sendError(error)
        console.log(`Connect Error: ${error.toString()}`)
    })

    client.on('connect',(connection)=>{
        console.log(`Websocket Client connected`)

        connection.on('error',(error)=>{
            coin.sendError(error)
            console.log(`Connection Error: ${error.toString()}`)
        })

        connection.on('close',()=>{
            console.log(`Connection Closed`)
            connect()
        })

        connection.on('message',(message)=>{
            let candle = JSON.parse(message.utf8Data).k
            //console.log(message)
            if(candle.x==true){
                coin.addClose(parseFloat(candle.c))
            }

        });
    });

    const connect = ()=>{
        //Make the Connection to the websocket
        client.connect(`${SOCKET}${coin.symbol}@kline_1m`);
    }
        coin.setClient(client);
        connect();
}

class Coin{
    constructor(symbol){

        this.symbol = symbol.toLowerCase()
        this.closes =[]
        createClient(this)
        this.events = new events.EventEmitter()
    }
    sendError(error){
        this.error = error;
    }
    setClient(client){
        this.client = client;
    }
    addClose(close){
        this.currentClose = close;
        this.closes.push(close)
        if(this.closes.length>100)this.closes.pop()
        this.events.emit('candle_closed',this.closes)
    }
    getCloses(){
        return this.closes
    }
    usdToCoin(usd){
        return usd/this.currentClose;
    }
    coinToUSD(coin){
        return coin/this.usdToCoin(1)
    }
}

module.exports = Coin
