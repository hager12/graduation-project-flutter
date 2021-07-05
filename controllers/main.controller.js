const userModel = require('../models/user.model');
const empModel = require('../models/employee.model');
const adminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res)=>{
    let {email, password} = req.body;
    let x = await userModel.findOne({email});
    let y = await empModel.findOne({email});
    let z = await adminModel.findOne({email});
    if(x)
    {
        if(x.password == password)
        {
            jwt.sign({_id: x._id, email: x.email, name: x.name, role: "user", age: x.age, address: x.address, phoneNumber: x.phoneNumber},'yasmine',(err,token)=>{
                res.header('token', token).json({token: token, _id: x._id, email: x.email, name: x.name, age: x.age, address: x.address, phoneNumber: x.phoneNumber})
            })
        }
        else
        {
            res.json("incorrect password user")
        }
    }
    else if (y) {
        if(y.password == password)
        {
            jwt.sign({_id: y._id, email: y.email, name: y.name, role: "employee", age: y.age, salary: y.salary, jobTitle: y.jobTitle, phoneNumber: y.phoneNumber},'yasmine',(err,token)=>{
                res.json({token: token, _id: y._id, email: y.email, name: y.name, role: "employee", age: y.age, salary: y.salary, jobTitle: y.jobTitle, phoneNumber: y.phoneNumber})
            })
        }
        else
        {
            res.json("incorrect password employee")
        }
    }
    else if (z) {
        if(z.password == password)
        {
            jwt.sign({_id: z._id, email: z.email, name: z.name, role: "amdin", age: z.age, address: z.address, phoneNumber: z.phoneNumber},'yasmine',(err,token)=>{
                res.json({token: token, _id: z._id, email: z.email, name: z.name, role: "amdin", age: z.age, address: z.address, phoneNumber: z.phoneNumber})
            })
        }
        else
        {
            res.json("incorrect password admin")
        }
    }
    else
    {
        res.json("person not found")
    }
};
