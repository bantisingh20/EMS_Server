const { SaveDepartment ,GetAllDepartments ,GetDepartmentByName ,GetDepartmentById,DeleteDepartment ,UpdateDepartment } = require('../Schemas/departmentSchema');

const {SaveDesignation ,GetAllDesignation} =require('../Schemas/designationSchema.js');
const { SaveEmployee,upload } = require('../Schemas/employeesSchema.js');
const route = require('express').Router();
const {verifyuser } = require('../middleware/authmiddleware.js');

//#region Department Routes

route.post('/department/save-department',verifyuser,SaveDepartment)
route.get('/department/GetAllDepartment',verifyuser,GetAllDepartments);
route.get('/department/GetAllDepartmentByName',GetDepartmentByName);
route.get('/department/GetDepartmentById',GetDepartmentById);
route.post('/department/UpdateDepartment',UpdateDepartment);
route.delete('/department/deleteDepartmentByID/:id',DeleteDepartment);

//#endregion


route.post('/designation/save-designation',verifyuser,SaveDesignation)
route.get('/designation/GetAlldesignation',verifyuser,GetAllDesignation);

//#region Employee Routes

route.post('/employee/save-employee',verifyuser,upload.single('image'),SaveEmployee)
//#endregion

module.exports = route;
