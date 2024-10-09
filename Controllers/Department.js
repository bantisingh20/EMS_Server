const {DepartmentTable} = require("../Schemas/departmentSchema");

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
            return res.status(404).json({ success: false, message: "No departments found." });
        }

        res.status(200).json({ success: true, message: "Departments retrieved successfully", departments });
    } catch (error) {
        console.error('Error retrieving departments:', error);
        res.status(500).json({ success: false, message: "Error retrieving departments", error: error.message });
    }
};

// Function to search departments by name
const GetDepartmentByName = async (req, res) => {
    try {
        const { departmentName } = req.query;  
   
        //console.log(req.query)
        if (!departmentName) {
            return GetAllDepartments(req, res);
        }

        const departments = await DepartmentTable.find({
            departmentname: { $regex: departmentName, $options: 'i' } // Case-insensitive search
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

//module.exports = { SaveDepartment, GetAllDepartments, GetDepartmentByName };


