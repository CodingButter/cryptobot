//Require Native Modules
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
const express = require('express');
const dotenv = require("dotenv").config();

//Connect to server
mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',()=>{
    console.log('connected to database')
})

//Set Up SSL Credentials
const key = fs.readFileSync(path.join(__dirname,'ssl','server.key'),'utf8');
const cert = fs.readFileSync(path.join(__dirname,'ssl','server.crt'),'utf8');
const ca = fs.readFileSync(path.join(__dirname,'ssl','ca_bundle.crt'),'utf8');
const credentials = {key,cert,ca};

const app = express()

const ENV = JSON.parse(process.env[process.env.ENV]);
const SSL_PORT = ENV.SSL_PORT;
const corsOptions = {
    origin: false,
}

//Get Parser
const bodyParser = require('body-parser')
//Set Parser
app.use(bodyParser.json())
app.use(cors(corsOptions))
//Set Routes
app.use("/bot",require('./routes/bot'))
app.use("/auth",require("./routes/auth"))

const httpsServer = https.createServer(credentials,app);

const server = httpsServer.listen(SSL_PORT,()=>{
	console.log(`Listening on port ${SSL_PORT}`);
});

module.exports = server

