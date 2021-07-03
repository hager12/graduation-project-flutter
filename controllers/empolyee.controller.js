const hospitalModel = require('../models/hospital.model');
const reviewModel = require('../models/review.model');
const employeeModel = require('../models/employee.model');
const nodemailer = require('nodemailer')

/* GET users listing. */
module.exports.home = async (req, res) => {
    let allEmployees = await employeeModel.find({});
    res.json(allEmployees);
};

module.exports.allHospitals = async (req, res) => {
    let allHospitals = await hospitalModel.find({});
    res.json(allHospitals);
  };
module.exports.allReviews = async (req, res) => {
    let allReviews = await reviewModel.find({});
    res.json(allReviews);
};
module.exports.addHospital = async (req, res) => {
    try {
        let {location, name, picture} = req.body;
        let hospital = new hospitalModel({
        location,
        name,
        picture
        });
        await hospital.save();
        res.json({message: "success"});
    }
    catch(e) {
        res.json(e);
    }
};
module.exports.updateHospital = async (req, res)=>{
    let {_id, location, name ,picture} = req.body;
    try {
        await hospitalModel.findOneAndUpdate({_id}, {location, name, picture})
        res.json("Updated");
    }
    catch(e) {
        res.json(e);
    }
};
module.exports.deleteHospital = async (req, res)=>{
    let _id = req.body._id;
    try {
        await hospitalModel.findOneAndDelete({_id})
        res.json("Deleted");
    }
    catch(e) {
        res.json(e);
    }
};

module.exports.sendReport = async (req, res)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "system.revive@gmail.com", // generated ethereal user
          pass: "revive123456", // generated ethereal password
        },
    });

    let info = {
        from: '"REVIVE TEAM" <system.revive@gmail.com>', // sender address
        to: req.body.email, 
        subject: "Report Mail",
        html: 
        `
            <div>
                <h3>Hello ${req.body.name},</h3>
                <br><p>${req.body.report}</p>
            </div>
        `
    };

    await transporter.sendMail(info, (err)=>{
        if(err) {
            res.json(err);
        }
        else {
            res.json("Report has been sent");
        }
    })
};