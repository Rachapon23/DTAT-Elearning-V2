const Quiz = require("../models/quize")
const ObjectId = require('mongoose').Types.ObjectId;
const studentActivity = require('../models/studentActivity')

exports.sendQuizStudent = async (req, res) => {
    try {
        const {
            ans,
            quiz,
        } = req.body
        const { fisrtname, user_id } = req.user

        const quize = await Quiz.findOne({ _id: quiz })
            .populate('course')
            .exec()

        let totalScore = 0;
        for (let i = 0; i < ans.length; i++) {
            if (quize.question[i].ans == ans[i]) {
                totalScore++;
            }
        }

        const activity = await studentActivity.findOneAndUpdate(
            {
                coursee: quize.course._id,
                user: user_id
            }, {
            score: totalScore,
            max_score: quize.question.length,
            ans: ans,
        }
        ).exec()


        // console.log(activity)

        res.send(activity)
    }
    catch (err) {
        console.log("fail to list score");
        res.status(500).json({ error: "fail to sendQuizStudent" })
    }
}

exports.listScore = async (req, res) => {
    try {
        const {
            quiz,
        } = req.body
        const { user_id } = req.user

        const quize = await Quiz.findOne({ _id: quiz })
            .populate('course')
            .exec()

        const activity = await studentActivity.findOne(
            {
                coursee: quize.course._id,
                user: user_id
            }
        ).exec()

        // console.log("---->",examiners)
        // const query_quiz = await Quiz.findOne({_id: quiz}).exec()

        // let payload = []
        // examiners.forEach((examiner, index) => {
        //     payload.push({key: index+1, score: activity, max_score: query_quiz.question.length})    
        // });
        // console.log(payload)

        res.send(activity)

    }
    catch (err) {
        console.log("fail to list score");
        res.status(500).json({ error: "fail to list score" })
    }
}


exports.getAccessNumber = async (req, res) => {
    try {
        const {
            quiz,
        } = req.body

        const { user_id } = req.user

        const quize = await Quiz.findOne({ _id: quiz })
            .populate('course')
            .exec()

        const activity = await studentActivity.findOne(
            {
                coursee: quize.course._id,
                user: user_id
            }
        ).exec()

        // console.log(!!!activity.score)
        // res.send("ok")
// console.log(!activity.score,activity.score)
        if (activity.score == undefined) {
    
            return res.send({
                quiz_active: true,
                // access_number: 0,
                maximum_access: quize.attemp,
            })
        }
        else {
      
            // if (examiners.length < quiz_access_number.attemp) {
            //     return res.send({
            //         quiz_active: true,
            //         // access_number: examiners.length,
            //         maximum_access: quize.attemp,
            //     })
            // }
            return res.send({
                quiz_active: false,
                // access_number: examiners.length,
                maximum_access: quize.attemp,
            })
        }

    }
    catch (err) {
        console.log(err,"fail to get access number");
        res.status(500).json({ error: "fail to get access number" })

    }
}

exports.updateProcess = async (req, res) => {
    try {
        const { course, process, completed } = req.body;
        const { user_id } = req.user
        console.log("process -> ",process, user_id, course)
        console.log("process data: ",process)
        if(!process) {
            console.log("HI ITS ME")
            const data = await studentActivity.findOneAndUpdate({user: user_id, coursee: course}, {completed: completed}).exec()
            console.log("after update",data)
        }
        else {
            await studentActivity.findOneAndUpdate({user: user_id, coursee: course}, {process: process, completed: completed}).exec()
        }
        res.send("update process success")
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update process')
    }
}

exports.getProcess= async (req, res) => {
    try {
        const { course } = req.body;
        const { user_id } = req.user
        // console.log("process -> ",process, user_id)
        const student_activity = await studentActivity.findOne({user: user_id, coursee: course}).exec()
        res.send(student_activity)
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error!!! on update process')
    }
}
