const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    icon:{
        type:String,
    },
    source:{
        required:true,
        type:String
    },
    amount:{
        type:Number, 
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

},
{
    timestamps:true
})

module.exports = mongoose.model('Income',IncomeSchema)