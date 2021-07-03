const hospitalModel = require('../models/hospital.model');
const userModel = require('../models/user.model');
const reviewModel = require('../models/review.model');
const departmentModel = require('../models/department.model');
const bookingModel = require('../models/booking.model')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { spawn } = require('child_process');

module.exports.home = async (req, res)=> {
    let allUsers = await userModel.find({});
    res.json(allUsers);
}
module.exports.signup = async (req, res)=>{
    try {
      let {email, password , address, age, phoneNumber, name, picture } = req.body;
      let user = new userModel({
        email,password,address, age ,phoneNumber,name, picture
      });
      await user.save();
      res.json({message: "success"});
    }
    catch(e) {
      res.json(e);
    }
};
module.exports.login = async (req, res)=>{
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user)
    {
        if(user.password == password)
        {
            jwt.sign({_id: user._id, email: user.email, name: user.name, role: "user"},'yasmine',(err,token)=>{
                res.header('token', token).json({name : user.name})
            })
        }
        else
        {
            res.json("incorrect password")
        }
    }
    else
    {
        res.json("user not found")
    }
};
module.exports.userByID = async (req, res)=>{
let _id = req.body._id; 
try {
    let user = await userModel.findOne({_id})
    if(user)
    {
    res.json(user);
    }
    else
    {
    res.json("user not found")
    }
}
catch(e) {
    res.json(e);
}
};
module.exports.hospitalByName = async (req, res)=>{
let location = req.body.location; 
try {
    let hospital = await hospitalModel.find({location})
    if(hospital)
    {
    res.json(hospital);
    }
    else
    {
    res.json("hospital not found")
    }
}
catch(e) {
    res.json(e);
}
};

module.exports.contact = async (req, res)=>{
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
        subject: "Contact Mail", // Subject line
        // text: "Hello world?", // plain text body
        html: 
        `
            <div style="background-color:#023351; color:#fff; padding:25px">
                <h1>Hello ${req.body.name},</h1>
                <br><p>We have recevied your message and we'll contact with you very soon.
                <br>Thank you for your contact without you, we wouldn't be here.</p>
            </div>
        `
    };

    await transporter.sendMail(info, (err)=>{
        if(err) {
            res.json(err);
        }
        else {
            res.json("Mail has been sent");
        }
    })
};

module.exports.updateUser = async (req, res)=>{
    let {_id, email, password,address, age ,phoneNumber,name,picture } = req.body;
    try {
        await userModel.findOneAndUpdate({_id}, {
        email,
        password,address, age ,phoneNumber,name,picture
        })
        res.json("Updated");
    }
    catch(e) {
        res.json(e);
    }
};

module.exports.allHospitals = async (req, res)=>{
let allHospitals = await hospitalModel.find({});
res.json(allHospitals);
};

module.exports.allReviews = async (req, res)=>{
    let allReviews = await reviewModel.find({});
    res.json(allReviews);
};
// module.exports.addReview = async (req, res)=>{
//     try {
//         let {comment, userID} = req.body;
//         const process = spawn('python', ['../python/task_py.py', comment]);
//         process.stdout.on('data', function (data) {
//         console.log(data.toString());
//         keywords = data.toString();
//         let review = new reviewModel({
//             comment,
//             userID,
//             keywords
//         });
//         await review.save();
//         res.json({message: "success"});
//     }
//     catch(e) {
//         res.json(e);
//     }
// }
// function AddRecord(req, res) {
//     var review = new Review()
//     review.comment = req.body.comment;
//     const process = spawn('python', ['../python/task_py.py', review.comment]);
//     process.stdout.on('data', function (data) {
//       console.log(data.toString());
//       review.keywords = data.toString();
//       review.save((err, doc) => {
//         if (!err) {
//           res.redirect('/myreviews');
//         } else {
//           console.log('Error During record Adding :' + err);
//         }
//       });
//     })
// };

module.exports.updateReview = async (req, res)=>{
let {_id, comment} = req.body;
try {
    await reviewModel.findOneAndUpdate({_id}, {comment})
    res.json("Updated");
}
catch(e) {
    res.json(e);
}
};
module.exports.deleteReview = async (req, res)=>{
let _id = req.body._id;
try {
    await reviewModel.findOneAndDelete({_id})
    res.json("Deleted");
}
catch(e) {
    res.json(e);
}
};

module.exports.booking = async (req,res)=>{
    let _id = req.body._id; 
    try {
        let booking = await departmentModel.findOne({_id});
        if(booking.availableRoom >= 1) {
            try {
                booking.availableRoom = booking.availableRoom -1;
                let depName = booking.name ;
                let hosID = booking.hospitalID;
                let leastPrice = booking.leastPrice;
                let mostPrice = booking.mostPrice;
                let rooms = booking.availableRoom;
                let hospitalData = await hospitalModel.findById({_id : hosID})
                hosName = hospitalData.name
                let book = new bookingModel({
                    depName,
                    hosID,
                    hosName,
                    leastPrice,
                    mostPrice
                })
                await book.save();
                res.json({message: "success"});
                await departmentModel.findOneAndUpdate({_id}, {availableRoom : rooms})
            }
            catch(e) {
                res.json(e)
            }
        }
        else {
            res.json("No available Rooms")
        }
    }
    catch(e) {
        res.json(e);
    }
}