const router = require('express').Router();
const Bot = require("../Bot")

router.post("/",(req,res)=>{
    let {risk,strategy,symbol,cashWallet,coinWallet} = req.body
    let myBot = new Bot({risk,strategy,symbol,cashWallet,coinWallet})
    res.json({status:"success",uuid:myBot.getUUID()})
})

router.post("/:botUUID",(req,res)=>{
    let {strategy} = req.body
    let {botUUID} = req.params
    let myBot = Bot.getBot(botUUID)
    myBot.updateStrategy(strategy.options)
    if(myBot==undefined){
        res.json({status:"failed",error:`No bot found with uuid of ${botUUID}`})
    }
    else{
        res.json({status:"success",uuid:botUUID})
    }
})



module.exports = router;
