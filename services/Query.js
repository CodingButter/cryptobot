const db = require("./Database")

module.exports.getUsers =async (req,res)=>{
    db.serialize(()=>{
        db.all("SELECT * FROM users"),(data)=>{
            console.log(data)
            res.json({"status":"working"})
        }
    })
}