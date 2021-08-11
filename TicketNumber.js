const fs = require('fs');
module.exports.getTicketNumber = async ()=>{
        const tn = fs.readFileSync("ticket.number")
        return parseInt(tn)
}
module.exports.setTicketNumber  = async (ticketNumber)=>{
        console.log(ticketNumber)
        return await fs.writeFileSync("ticket.number",ticketNumber,data=>console.log  )      
}