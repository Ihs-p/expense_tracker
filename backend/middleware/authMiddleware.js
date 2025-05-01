const jwt  = require('jsonwebtoken')
const User = require('../models/User')


exports.protect = async (req,res,next) =>{
const token  = await req.headers.authorization?.split(" ")[1];
console.log(token)
if (!token ) return  res.status(401).json({message:"not authorized, no token"})


try {
    const decoded =  jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
} catch (error) {
    console.log(error)
    return res.status(401).json({message:"not authorized, token expired"})
    
}
}