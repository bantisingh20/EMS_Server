const mongoose = require('mongoose');
const multer = require('multer');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt =require('bcrypt');
const {UserTable} = require("../Schemas/user");

const EmployeeSchema = new mongoose.Schema({
// employeeid : {type:Number ,required : true ,default:0 },
employeecode : {type:String,required :true, default:'' }, 
Userid :{type: mongoose.Schema.Types.ObjectId,ref:"User"},
firstname : { type:String , required : true },
lastname : { type : String , required :true},
contactno : {type:Number},
emailid: {type:String, required: true }, 
dateofbith :{type:Date},
dateofJoining : {type:Date,required:true},
gender :{type:String}, 
department : {type: mongoose.Schema.Types.ObjectId,ref:"Department"},
designation : {type: mongoose.Schema.Types.ObjectId,ref:"Department"},
address :{ type:String},
activestatus:{type: String, enum: ['n', 'y'] ,default: 'y'},
recordstatus: { type: String, required: true, default: 'insert' },
statusdate: { type: Date, default: Date.now },
disabled: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
isdeleted: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
})


// EmployeeSchema.plugin(AutoIncrement, { inc_field: 'employeeid' });
const EmployeeTable = mongoose.model("Employee",EmployeeSchema)

const storage = multer.diskStorage({
    destination :(req,file,cb) =>{
        cb(null,"public/UploadDocument")
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() +path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const SaveEmployee = async(req,res) => {

    try{ 

        const {employeecode,firstname,lastname,contactno,emailid,dateofbith,dateofJoining,
            gender,department,designation,address,password,role
        } = req.body;
        console.log(req.body);

        const employeExist = await EmployeeTable.findOne( {emailid})
        console.log(employeExist);
        if(employeExist){
           return res.status(400).json({success:false , message:"Employee Exist" });
        } 
        

        console.log(password);
        const haspassword = await bcrypt.hash(password,10);
        const newUser = new UserTable({
            name : `${firstname} ${lastname}`,
            email:emailid,
            password:haspassword,
            role:"admin",
            profileImage:req.file ? req.file.name : "",
            disabled:"n"

        })

       
        const newSavedUserid = await newUser.save();

        console.log(newSavedUserid);
        const NewEmployee = EmployeeTable({
            employeecode,
            Userid:newSavedUserid._id =="" ? 0:newSavedUserid._id,
            employeecode
            ,firstname
            ,lastname
            ,contactno
            ,emailid
            ,dateofbith
            ,dateofJoining
            ,gender
            ,department
            ,designation
            ,address
        });
        await NewEmployee.save();
        res.status(200).json({ success: true, message: "Employee Saved", data: NewEmployee });
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success:false , message:"Server Error" , error:error.message});
    }
}


const GetAllEmployees = async(req,res) => {
    try {
         
        const employee = await EmployeeTable.find().populate('department').populate("Userid");
        console.log(employee) 

        if(!employee.length){
            return res.status(500).json({success:true, message:"Employee not Exist"})
        }

        res.status(200).json({success:true, message:"Employee retrieving successfully" , data:employee})
        
    } catch (error) {
        console.error('Error retrieving Employee:', error);
        res.status(500).json({ success: false, message: "Error retrieving Employee", error: error.message });
    }
}
module.exports = {EmployeeTable ,SaveEmployee,upload ,GetAllEmployees}