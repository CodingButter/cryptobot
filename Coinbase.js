const CoinbasePro = require('coinbase-pro')
const dotenv = require('dotenv').config()
const base64 = require('base-64')
const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const passphrase = process.env.PASS_PHRASE;
const apiURI = 'https://api.pro.coinbase.com';
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';

const authedClient = new CoinbasePro.AuthenticatedClient(
  key,
  secret,
  passphrase,
  apiURI
);

authedClient.getAccounts((err,res,data)=>{
    //console.log(data)
})

module.exports = authedClient
