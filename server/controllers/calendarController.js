
const Calendar = require('../models/calendar')
const layout = require('../models/layout')

exports.createCalendar = async (req, res) => {
    try {
        const calendar = await new Calendar(req.body.values).save()
        //    console.log(req.body.values)
        res.send(calendar);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on create calendar");
    }
};

exports.listCalendar = async (req, res) => {
    try {
        const calendar = await Calendar.find({}).populate({
            path: "coursee",
            populate: {
                path: "room"
            },

        })
        res.send(calendar);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on list calendar");
    }
};

exports.updateCalendar = async (req, res) => {
    try {
        const calendar = await Calendar.findOneAndUpdate(
            { _id: req.body.id },
            { start: req.body.start, end: req.body.end }
        )

        res.send(calendar);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on list calendar");
    }
};

exports.deleteCalendar = async (req, res) => {
    try {

        const course = await Calendar.findOne(
            { _id: req.params.id }).populate("coursee").select("coursee")
        if (req.user.role == 'admin') {
            const calendar = await Calendar.findOneAndDelete(
                { _id: req.params.id })
            res.send(calendar);
        } else {
            if (req.user.user_id == course.coursee.teacher) {
                const calendar = await Calendar.findOneAndDelete(
                    { _id: req.params.id })
                res.send(calendar);
            } else {
                res.status(400).send("you have no rights")
            }
        }


        // console.log(req.params.id)
        // res.send("calendar");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on list calendar");
    }
};