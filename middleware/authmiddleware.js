const {UserTable} = require("../Schemas/user");
const bcrypt =require('bcrypt')
const jwt = require("jsonwebtoken")

const verifyuser = async(req,res,next) => {
    try {
       
        console.log(req.headers.authorization);
 
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token || token == null){
            console.log("token is invalid")
            return res.status(404).json({success:false, message :"Token not provided"});
           
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            console.log("token is not valid");
            return res.status(404).json({success:false, message :"Token not valid"});
        }

        const user = await UserTable.findById({_id: decode._id}).select('-password');
        if(!user){
            console.log("user not found");
            return res.status(404).json({success:false, message :"User Not Found"});
        }
    
        //console.log(user)
        req.user= user;
        next();
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message :"Server Error"});
    }
    
}

module.exports = {
   verifyuser
}