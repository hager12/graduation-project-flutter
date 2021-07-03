const employeeModel = require('../models/employee.model');
const adminModel = require('../models/admin.model');
const hospitalModel = require('../models/hospital.model');

module.exports.home = async (req, res) => {
    let allAdmins = await adminModel.find({});
    res.json(allAdmins);
};

module.exports.allEmployee = async (req, res) => {
    let allEmployee = await employeeModel.find({});
    res.json(allEmployee);
};
module.exports.allHospital = async (req, res) => {
    let allHospital = await hospitalModel.find({});
    res.json(allHospital);
};
module.exports.addEmployee = async (req, res) => {
    try {
      let {email, password, salary, jobTitle, address, age, name, phoneNumber, picture, role} = req.body;
      let employee = new employeeModel({
        email,
        password, salary, jobTitle, address, age, name, phoneNumber, picture, role
      });
      await employee.save();
      res.json({message: "success"});
    }
    catch(e) {
      res.json(e);
    }
};
module.exports.updateEmployee = async (req, res) => {
    let {_id, email, password, salary, jobTitle, address, age, name, phoneNumber, picture, role} = req.body;
    try {
        await employeeModel.findOneAndUpdate({_id}, {email, password, salary, jobTitle, address, age, name, phoneNumber, picture, role})
        res.json("Updated");
    }
    catch(e) {
        res.json(e);
    }
};
module.exports.deleteEmployee = async (req, res) => {
    let _id = req.body._id;
    try {
        await employeeModel.findOneAndDelete({_id})
        res.json("Deleted");
    }
    catch(e) {
        res.json(e);
    }
};