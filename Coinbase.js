const dotenv = require('dotenv').config()
const fetch = require('node-fetch')
const sha256 = require('js-sha256').sha256
const qs = require('querystring')
const base = "https://api.coinbase.com/v2"

/*
 *  returns a sha256 HMAC hash to pass send to the server
 *  for authentification. this key is the api secret and the
 *  message to hash is the method[in caps] the request url and the body
 *  added together
 */
const getSignature = ({api_secret,timestamp,method,requestPath,body})=>{
    method = method.toUpperCase()
    body = body || ''
    return sha256.hmac(api_secret,timestamp+method+requestPath+body)
}

const getHeaders = (apiKey,sign,timestamp)=>{
    return {
        "CB-ACCESS-KEY":apiKey,
        "CB-ACCESS-SIGN":sign,
        "CB-ACCESS-TIMESTAMP":tiemstamp,
        "Content-Type": "application/json"
    }
}

const call = async (endpoint,method,data)=>{
    let timestamp = Date.now()/1000|0
    let method = method
    endpoint = (endpoint[0]!=="/")?"/"+endpoint:endpoint;
    let requestPath = base+endpoint
    let signiture = getSignature({timestamp,method,requestPath,data});
    let headers = getHeaders(process.env.API_KEY,'GET',timestamp)
    return new Promise((resolve,reject)=>{
        fetch(requestPath,{method:'GET',headers})
        .then(res=>res.json())
        .catch(err=>{
           reject(err)
        })
        .then(json=>{
            resolve(json)
        })
    })
}

const get = async (endpoint,data)=>{
    return await call(endpoint,"GET",data);
}
const post = async (endpoint,data)=>{
    return await call(endpoint,"POST",data);
}

class Client{
    constructor(api_credentials){
        this.apiKey = api_credentials.apiKey
        this.apiSecret = api_credentials.apiSecret
    }
    async getUser(){
        return await get("/user")
    }

}

var client = new Client({'apiKey':process.env.API_KEY,'apiSecret':process.env.API_SECRET})

client.getAccounts({}).then((accounts)=>{
    console.log(accounts)
    //if(err)console.log(err)
    accounts.forEach((acct)=>{
        console.log(`my bal: ${acct.balance.amount} for ${acct.name}`)
    })
})
*/
