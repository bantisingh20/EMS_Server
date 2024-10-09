const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EmployeeSchema = new mongoose.Schema({
employeeid : {type:Number ,required : true ,default:0 },
employeecode : {type:String,required :true, default:''},
firstname : { type:String , required : true },
lastname : { type : String , required :true},
contactno : {type:Number},
emailid: {type:String, required: true },
gender :{type:String},
dateofbith :{type:String},
department : { type: String , required :true},
designation : { type: String , required :true},
dateofJoining : {type:Date,required:true},
address :{ type:String},
employeetype: {type:String},
activestatus:{type: String, enum: ['n', 'y'] ,default: 'y'},
recordstatus: { type: String, required: true, default: 'insert' },
statusdate: { type: Date, default: Date.now },
disabled: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
isdeleted: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
isUser :{type: Boolean,enum :['n','y'] ,default:'y'},

})


EmployeeSchema.plugin(AutoIncrement, { inc_field: 'employeeid' });
const EmployeeTable = mongoose.model("Employee",EmployeeSchema)

const SaveEmployee = async(req,res) => {

    try{ 

        const {emailid} = req.body;
        console.log(req.body);

        const employeExist = await EmployeeTable.find( {emailid})
        if(employeExist){
            res.status(400).json({success:false , message:"Employee Exist" });
        } 

        const NewEmployee = EmployeeTable(req.body);
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
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = {EmployeeTable ,SaveEmployee}