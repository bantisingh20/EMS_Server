const {UserTable} = require("../Schemas/user");
const bcrypt =require('bcrypt')
const jwt = require("jsonwebtoken")

const Login = async(req,res) =>{
    try{
       
        const { email, password } = req.body;
        console.log(email);
        const user = await UserTable.findOne({email});
        if(!user){
            return  res.status(400).json({success:false,message:"User not exists"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);    
        if(!isPasswordMatch){
            return  res.status(400).json({success:false, message:"Password is incorrect"});
        }

        const token = jwt.sign({_id: user._id , role: user.role }, process.env.JWT_SECRET,{expiresIn:"1d"})
        
        res.status(200).json({success:true, message:"login Successfull", token, user});
    }
    catch(error){
        res.status(400).json({success:false, message:"Error during login"+ error});
    }
   

    
}


const verify = async(req,res) => {
  return res.status(200).json({success:true, message:" Successfull",  user: req.user});
    
}

 module.exports = {
    Login
    ,verify
}