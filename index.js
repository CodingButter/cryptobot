//Require Native Modules
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");
const express = require("express");
const { BuildScript } = require("./BuildScript");
const crudRouter = require("./routes/Crud");
const paymentStatus = require("./paymentCron");
const createExtentionRequest = require("./ExtensionRequest");
const { AuthRouter, AuthMiddleware } = require("./services/Auth");
require("dotenv").config();
var enabledTime = 0;
const scriptTimeout = 1000 * 60 * 60 * 10;
//CREATE
const paymentMiddleware = async (req, res, next) => {
  const { totalPaid, totalExpected } = await paymentStatus();
  const data = {
    totalPaid,
    totalExpected,
    remaining: totalExpected - totalPaid,
    status: totalExpected - totalPaid > 0 ? "unpaid" : "paid",
    bitcoin_address: `${process.env.BITCOIN_ADDRESS}`,
    type: "Payment",
    error: "Pay me OR I End THIS!",
    /*`Payment Required, $${
      totalExpected - totalPaid
    } USD Remaining (Bitcoin Address : ${process.env.BITCOIN_ADDRESS})`,*/
  };
  if (totalPaid >= totalExpected) {
    console.log({ data });
    next();
  } else {
    res.json(data);
  }
};
//Set Up SSL Credentials

const key = fs.readFileSync(
  path.join(__dirname, "ssl", "chatstyler.tk", "server.key"),
  "utf8"
);
const cert = fs.readFileSync(
  path.join(__dirname, "ssl", "chatstyler.tk", "server.crt"),
  "utf8"
);
//const ca = fs.readFileSync(path.join(__dirname,'ssl','ca_bundle.crt'),'utf8');
const credentials = { key, cert };

const app = express();
app.enable("trust proxy");
const SSL_PORT = 5123;
const HTTP_PORT = 80;
//Get Parser
const requestIp = require("request-ip");
const bodyParser = require("body-parser");
var currentTicketNumber = 0;
var confirmTicketNumber = 0;
var lastStreamCode = "";
var raffleOrder = "";
//Set MiddleWare

app.use(function (request, response, next) {
  console.log(request.secure);
  if (!request.secure) {
    response.redirect("https://" + request.headers.host + request.url);
  }

  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-allow-Origin", "*");
  res.header("Access-Control-allow-Headers", "*");
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({ preflight: "true" });
  }
  next();
});

app.use(bodyParser.json());

//app.use(AuthMiddleware);

app.use(requestIp.mw());

app.use("/crud", crudRouter);
//app.use("/auth", AuthRouter);
//Set Routes
app.use("/jamesabram", express.static("public"));
app.get("/streamlab/:streamcode", async (req, res) => {
  let streamLabCode = req.params.streamcode;
  lastStreamCode = streamLabCode;
  res.json({ streamLabCode });
});
app.get("/laststream", async (req, res) => {
  res.json({ lastStreamCode });
});
app.get("/7dayschat", async (req, res) => {
  let chatextension = path.join(__dirname, "data/7dayschat.zip");
  res.sendFile(chatextension);
});
app.get("/logo", async (req, res) => {
  let chatextension = path.join(__dirname, "data/7dlogo.png");
  res.sendFile(chatextension);
});
app.use(createExtentionRequest).get("/script.js", async (req, res) => {
  res.header("Content-Type:application/javascript");
  res.send(
    BuildScript(currentTicketNumber, Date.now() - enabledTime < scriptTimeout)
  );
});
app.use(paymentMiddleware).get("/st/:ticketnumber", (req, res) => {
  enabledTime = Date.now();
  currentTicketNumber = req.params.ticketnumber;

  res.json({ status: "success" });
});
app.post("/ct", (req, res) => {
  console.log(req.body);
  confirmTicketNumber = Buffer.from(req.body.ct, "base64").toString("ascii");

  console.log({ confirmTicketNumber });
  res.json({ status: "success" });
});
app.get("/confirm", (req, res) => {
  console.log(currentTicketNumber);
  res.json({
    ready:
      currentTicketNumber === confirmTicketNumber && currentTicketNumber != 0,
    ticket: currentTicketNumber,
  });
});
app.get("/rigger", (req, res) => {
  res.send("Rigger/build/index.html");
});
app.get("/setorder", (req, res) => {
  raffleOrder = req.query.raffleorder.split(",");
  res.json({ status: "ordersent", raffleOrder });
});
app.get("/getorder", (req, res) => {
  res.json({ raffleOrder });
});

const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});

const server = httpsServer.listen(SSL_PORT, () => {
  console.log(`Listening on port ${SSL_PORT}`);
});

module.exports = server;
