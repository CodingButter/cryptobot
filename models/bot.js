const mongoose = require('mongoose')
const Schema = mongoose.Schema
const botSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default: 'Active'
    },
    strategy:{
        type:String,
        required:true
    },
    settings:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model('Bot',botSchema)