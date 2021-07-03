const departmentModel = require('../models/department.model');

module.exports.allDepartments = async (req, res)=>{
    let allDepartments = await departmentModel.find({});
    res.json(allDepartments);
};

module.exports.depByID = async (req, res)=>{
    let hospitalID = req.body.hospitalID; 
    try {
        let dep = await departmentModel.find({hospitalID})
        if(dep)
        {
        res.json(dep);
        }
        else
        {
        res.json("dep not found")
        }
    }
    catch(e) {
        res.json(e);
    }
};
module.exports.addDep = async (req, res)=>{
    try {
        let {name, availableRoom, leastPrice, mostPrice, hospitalID} = req.body;
        let dep = new departmentModel({
            name,
            availableRoom,
            leastPrice,
            mostPrice,
            hospitalID
        });
        await dep.save();
        res.json({message: "success"});
    }
    catch(e) {
        res.json(e);
    }
};
module.exports.updateDep = async (req, res)=>{
let {_id, name, availableRoom} = req.body;
try {
    await departmentModel.findOneAndUpdate({_id}, {name, availableRoom})
    res.json("Updated");
}
catch(e) {
    res.json(e);
}
};
module.exports.deleteDep = async (req, res)=>{
let _id = req.body._id;
try {
    await departmentModel.findOneAndDelete({_id})
    res.json("Deleted");
}
catch(e) {
    res.json(e);
}
};