//Require Native Modules
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

//Require Server Modules
const express = require('express');
const app = express();

//Require Environment Variables
const dotenv = require("dotenv").config();
const ENV = JSON.parse(process.env[process.env.ENV]);
const SSL_PORT = ENV.SSL_PORT;
const HTTP_PORT = ENV.HTTP_PORT;

//Get Parser
const bodyParser = require('body-parser')

//require routes
const botRouter = require('./routes/bot')
const authRouter = require("./routes/auth");

//Set Parser
app.use(bodyParser.json())

//Set Routes
app.use("/auth",authRouter)
app.use("/bot",botRouter)

//Set Up SSL Credentials
const key = fs.readFileSync(path.join(__dirname,'ssl','server.key'),'utf8');
const cert = fs.readFileSync(path.join(__dirname,'ssl','server.crt'),'utf8');
const ca = fs.readFileSync(path.join(__dirname,'ssl','ca_bundle.crt'),'utf8');
const credentials = {key,cert,ca};



const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials,app);


httpServer.listen(HTTP_PORT,()=>{
	console.log(`Listeing on port ${HTTP_PORT}`);
});
httpsServer.listen(SSL_PORT,()=>{
	console.log(`Listening on port ${SSL_PORT}`);
});
