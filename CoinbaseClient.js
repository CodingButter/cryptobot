const Client = require('coinbase').Client;
const dotenv = require("dotenv").config;
const client = new Client({'apiKey':process.env.API_KEY,'apiSecret':process.env.API_SECRET,strictSSL:false });

client.getAccounts({},(err,accounts)=>{
    console.log(err)
    console.log(accounts)
})
