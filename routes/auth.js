const router = require('express').Router();
const bodyParser = require('body-parser')
const fetch = require("node-fetch")
const dotenv = require("dotenv").config()
const qs = require('querystring')
const tokenUrl = "https://api.coinbase.com/oauth/token"
const testUrl ="https://webhook.site/0e3a9637-b919-42d0-b2a7-c29db160b76b"
router.get("/",(req,res)=>{
    let  {code} = req.query
    let bodyJSON = {
        grant_type:"authorization_code",
        code,
        client_id:process.env.CLIENT_ID,
        client_secret:process.env.CLIENT_SECRET,
        redirect_uri:"https://crypto.codingbutter.com/auth/token"
    }
    let body = qs.stringify(bodyJSON)

    console.log(body)
    fetch(tokenUrl,{method:'post',body}).then((res)=>res.text())
    .then((text)=>{
        console.log(text)
        res.json({text})
    })
});

const urlencodedParser = bodyParser.urlencoded({extended:false});
router.post("/token",(req,res)=>{
   res.json(rq.body)
})

module.exports = router;
