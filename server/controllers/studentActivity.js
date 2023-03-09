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
