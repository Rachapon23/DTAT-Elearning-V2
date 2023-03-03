const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.checkUser = (req,res,next) =>{
    try{
        const token = req.headers["authtoken"]
        
        // console.log("token: ",req.headers["authtoken"])
        if(!token){
            return res.status(401).send("no token, authorization denied")
        }
        const decoded = jwt.verify(token,"jwtSecret")
        // console.log("Middleware: ",decoded)
        req.user = decoded.user
        next()
    }catch(err){
        console.log(err)
        res.status(400).send('Token Invalid!!!')
    }
}

exports.checkTeacher = async(req,res,next) =>{
    try{
        const {user_id} = req.user
        const teacherUser = await User.findOne({_id:user_id}).exec()
        // console.log(teacherUser)
       if(teacherUser.role == 'teacher' ||
       teacherUser.role == 'admin'
        ){
            next()
        }else{
           res.status(403).send({message: "teacher Access denied", role: teacherUser.role})
        }
        
    }catch(err){
        console.log(err)
        res.status(400).send('teacher Access denied')
    }
}
exports.checkAdmin = async(req,res,next) =>{
    try{
        const {user_id} = req.user
        const adminUser = await User.findOne({_id:user_id}).exec()
        if(adminUser.role !== 'admin'){
            res.status(403).send({message: "Admin Access denied", role: adminUser.role})
        }else{
            next()
        }
        
    }catch(err){
        console.log(err)
        res.status(400).send('Admin Access denied')
    }
}