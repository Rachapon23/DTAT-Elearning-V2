const User = require('../models/userModel')

exports.listAlluser = async (req, res) => {
    try {
        const user = await User.find({})
            .select("-password")
            .exec();
        // console.log("User: ", user)
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on liastAlluser");
    }
};

exports.listStudentuser = async (req, res) => {
    try {
        const user = await User.find({role:"student"})
            .select("-password")
            .exec();
        // console.log("User: ", user)
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on listStudentuser");
    }
};
exports.listTeacheruser = async (req, res) => {
    try {
        const user = await User.find({role:"teacher"})
            .select("-password")
            .exec();
        // console.log("User: ", user)
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on listStudentuser");
    }
};


exports.ChangeRole = async (req, res) => {
    try {
        const value = req.body
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { role: req.body.role }
            ).select("-password")

        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on ChangeRole");
    }
};

exports.changeEnable = async (req, res) => {
    try {
        const data = req.body
        const status = data.enabled !== true
        const user = await User.findOneAndUpdate(
            {_id: data.id},
            {enabled: status}
        ).select("-password")

        res.send(user);
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Server Error!!! on change enanbled");
    }
}
