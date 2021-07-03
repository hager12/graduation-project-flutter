const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const token = req.header('token')
    if(token && token != null && token != undefined){
        jwt.verify(token, "yasmine", (err, decoded)=>{
            if(err){
                res.json("incorrect token")
            }
            else if(decoded.role == "employee") {
                next()
            }
        })
    }
    else{
        res.json("token is incorrect or not provided")
    }
}