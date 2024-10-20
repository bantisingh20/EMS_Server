const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DepartmentSchema = new mongoose.Schema({
    // departmentid: { type: Number, required: true,default:0 },
    departmentname: { type: String, required: true },
    recordstatus: { type: String, required: true, default: 'insert' },
    statusdate: { type: Date, default: Date.now },
    disabled: { type: String, enum: ['n', 'y'], required: true, default: 'n' },
    isdeleted: { type: String, enum: ['n', 'y'], required: true, default: 'n' }
});

// DepartmentSchema.plugin(AutoIncrement, { inc_field: 'departmentid' });
const DepartmentTable = mongoose.model("Department", DepartmentSchema);

// Insert department 
const SaveDepartment = async (req, res) => {
    try {
        const { departmentname } = req.body;
        console.log(req.body);
        const isExist = await DepartmentTable.findOne({ departmentname });
        if (isExist) {
            return res.status(400).json({ success: false, message: "Department Already Exists" });
        } 

        const newDepartment = new DepartmentTable({
            departmentname
        });
  
        await newDepartment.save();
        res.status(200).json({ success: true, message: "Department Saved", department: newDepartment });
    } catch (error) {
        console.error('Error saving department:', error);
        res.status(500).json({ success: false, message: "Error saving department", error: error.message });
    }
};

const GetAllDepartments = async (req, res) => {
    try {
        const departments = await DepartmentTable.find();

        if (!departments.length) {
            return res.status(200).json({ success: false, message: "No departments found." });
        }

        res.status(200).json({ success: true, message: "Departments retrieved successfully", data:departments });
    } catch (error) {
        console.error('Error retrieving departments:', error);
        res.status(500).json({ success: false, message: "Error retrieving departments", error: error.message });
    }
};

// Function to search departments by name
const GetDepartmentByName = async (req, res) => {
    try {
        const { departmentName } = req.query;  
   
        console.log(req.query)
        if (!departmentName) {
            return GetAllDepartments(req, res);
        }

        const departments = await DepartmentTable.find({
            $and: [
                { departmentname: { $regex: departmentName, $options: 'i' } }, // Case-insensitive search
                // { departmentid: departmentid }
            ]
        });
        
        if (!departments.length) {
            return res.status(404).json({ success: false, message: "No matching departments found." });
        }

        res.status(200).json({ success: true, message: "Departments retrieved successfully", data:departments });
    } catch (error) {
        console.error('Error searching departments:', error);
        res.status(500).json({ success: false, message: "Error searching departments", error: error.message });
    }
};


const GetDepartmentById = async (req, res) => {
    try {
        const { departmentid } = req.query;  
   
        console.log(req.query)
        if (!departmentid || departmentid == "0") {
            return GetAllDepartments(req, res);
        }

        const departments = await DepartmentTable.find({ 
            departmentid: 0              
        });
        
        if (!departments.length) {
            return res.status(404).json({ success: false, message: "No matching departments found." });
        }

        res.status(200).json({ success: true, message: "Departments retrieved successfully", departments });
    } catch (error) {
        console.error('Error searching departments:', error);
        res.status(500).json({ success: false, message: "Error searching departments", error: error.message });
    }
};



const DeleteDepartment = async(req,res) => {
    try { 
        const {id} = req.params; 
        console.log(id);
        const departments = await DepartmentTable.findByIdAndDelete({_id:id},)
        res.status(200).json({ success: true, message: "Departments Deleted Successfully", departments });

    } catch (error) {
        console.error('Error searching departments:', error);
        res.status(500).json({ success: false, message: "Error searching departments", error: error.message });
    }
}


const UpdateDepartment = async(req,res) => {
    try { 
        const {_id, departmentname} = req.body; 
        // console.log(req.body);
        const departments = await DepartmentTable.findByIdAndUpdate(
            { _id: _id },
            { departmentname: departmentname,statusdate:Date.now() },
            { new: true } // Optional: returns the updated document
        );
          
        res.status(200).json({ success: true, message: "Update Successfully", departments });

    } catch (error) {
        console.error('Error While Update:', error);
        res.status(500).json({ success: false, message: "Error While Update", error: error.message });
    }
}

module.exports = { DepartmentTable, SaveDepartment, GetAllDepartments, GetDepartmentByName ,GetDepartmentById , DeleteDepartment ,UpdateDepartment};


