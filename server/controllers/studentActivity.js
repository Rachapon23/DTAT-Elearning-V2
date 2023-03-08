const StudentActivity = require("../models/studentActivity")

exports.updateProcess = async (req, res) => {
    try {
        const { process } = req.body;
        const user_id = req.user
         await StudentActivity.findByIdAndUpdate({user: user_id}, {process: process}).exec()
        res.send("update process success")
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update process')
    }
}