const mongoose =require('mongoose');
const bcrypt =require('bcrypt')

// user table schema 
const userSchema = new mongoose.Schema({
    name:{type:String, required:true },
    email:{type:String, required:true },
    password:{type:String, required:true },
    role:{type:String, required:true ,enum:["users","admin","superadmin"]},
    profileImage:{type:String},
    createAt:{type:Date, default:Date.now},
    statusdate:{type:Date, default:Date.now},
    recordstatus:{type:String , enum:["insert","update"], default:"insert"},
    disabled:{type:String, enum:["n","d","y"], default:"n"}
})

// set name and schema of table in variable
const UserTable = mongoose.model("User",userSchema)



// save new user function 
const SaveUser = async(req,res) => {
 
    try {
        const {name ,email ,password,role} = req.body;
        this.email ="singhbanti9900@gmail.com";
        const IsUserExist = await UserTable.findOne({email});
                 
        if(IsUserExist){
            return res.status(400).json({success:false, message:"Email already exists"} )
        }

        const haspassword = await bcrypt.hash("admin123",10);
        const newUser = new UserTable({
            name:"Banti Singh",
            email:"singhbanti9900@gmail.com",
            password:haspassword,
            role:"superadmin",
            profileImage:"",
            disabled:"n"

        })

        await newUser.save();

        res.status(200).json({success:true ,message: "User Save"});
    } catch (error) {
        console.log(error);
    }

}
module.exports = { UserTable ,SaveUser };