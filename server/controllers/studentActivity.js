const StudentActivity = require("../models/studentActivity")

exports.updateProcess = async (req, res) => {
    try {
        const { course, process } = req.body;
        const { user_id } = req.user
        console.log(process, user_id)
         await StudentActivity.findOneAndUpdate({user: user_id, coursee: course}, {process: process}).exec()
        res.send("update process success")
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update process')
    }
}

exports.updateProcessToAll = async (req, res) => {
    try {
        const { course, process } = req.body;
        
        await StudentActivity.updateMany({coursee: course}, {'$set': {'process' : process}}).exec()
        res.send("update process to all student success")
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update process to all student')
    }
}
