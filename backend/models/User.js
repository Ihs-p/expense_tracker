const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const userSchema  = new mongoose.Schema({
    fullName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    profileImageUrl:{
        type:String, 
        default:null
    },
    
})

// hash password before saving
userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
    
})

// compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {

    return await bcrypt.compare(candidatePassword,this.password)
    
}

module.exports = mongoose.model("user",userSchema)