const { Login, verify } = require('../Controllers/Controllers');
const { SaveDepartment ,GetAllDepartments ,SearchDepartments } = require('../Schemas/departmentSchema');
const route = require('express').Router();
const {SaveUser} = require("../Schemas/user");
const {verifyuser } = require('../middleware/authmiddleware.js');

route.post('/login', Login); // Using the Login controller to handle the logic
route.get('/verify-user', verifyuser ,verify) // check user session verification
route.post('/save-user',SaveUser); // save new users

module.exports = route;
