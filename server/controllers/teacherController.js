const User = require('../models/userModel')

//getStudentby

exports.getStudentby = async (req, res) => {
    try {
        const {params} = req.params
        const user = await User.findOne({ _id: params }).populate("course")
        .exec()
//   console.log(params)
        res.send(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on getStudentby");
    }
}