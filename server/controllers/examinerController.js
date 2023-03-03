const Examiner = require("../models/examiner")
const Quiz = require("../models/quize")
const ObjectId = require('mongoose').Types.ObjectId;

exports.createExaminer = async(req, res) => {
    try {
        const {
            examiner_id,
            examiner_name,
            ans,
            quiz,
        } = req.body
        
        const teacherQuiz = await Quiz.findOne({_id: ObjectId(quiz)}).exec()
        console.log(req.body)
        
        const examiner = new Examiner({
            examiner_id: ObjectId(examiner_id),
            examiner_name: examiner_name,
            score: null,
            max_score: teacherQuiz.question.length,
            quiz: quiz,
            ans: ans,
        })
        await examiner.save()

        let totalScore = 0;
        for(let i = 0 ; i< ans.length ; i++) {
            if(teacherQuiz.question[i].ans == ans[i]) {
                totalScore++;
            }
        }

        await Examiner.findOneAndUpdate({_id:examiner._id}, {score: totalScore})
        res.send("process success")
    }
    catch(err) {
        console.log("fail to create examiner");
        res.status(500).json({ error: "fail to create create examiner" })
    }
}

exports.getAccessNumber = async(req, res) => {
    try {
        const {
            examiner_id,
            quiz,
        } = req.body
        const examiners = await Examiner.find({examiner_id: examiner_id, quiz: quiz}).exec()
        if(examiners.length === 0) {
            const quiz_access_number = await Quiz.findOne({_id: quiz}).exec()
            // console.log("qan -> ",quiz_access_number)
            return res.send({
                quiz_active: true,
                access_number: 0, 
                maximum_access: quiz_access_number.attemp,
            })
        }
        else {
            const quiz_access_number = await Quiz.findOne({_id: quiz}).exec()
            // console.log(quiz_access_number)s
            if(examiners.length < quiz_access_number.attemp) {
                return res.send({
                    quiz_active: true,
                    access_number: examiners.length, 
                    maximum_access: quiz_access_number.attemp,
                })
            }
            return res.send({
                quiz_active: false,
                access_number: examiners.length, 
                maximum_access: quiz_access_number.attemp,
            })
        }
        
    }
    catch(err) {
        console.log("fail to get access number");
        res.status(500).json({ error: "fail to get access number" })
    }
}

exports.listScore = async(req, res) => {
    try {
        const {
            examiner_id,
            quiz,
        } = req.body
        const examiners = await Examiner.find({examiner_id: examiner_id, quiz: quiz}).exec()
        // console.log("---->",examiners)
        const query_quiz = await Quiz.findOne({_id: quiz}).exec()
        let payload = []
        examiners.forEach((examiner, index) => {
            payload.push({key: index+1, score: examiner.score, max_score: query_quiz.question.length})    
        });
        // console.log(payload)
        res.send(payload)
        
    }
    catch(err) {
        console.log("fail to list score");
        res.status(500).json({ error: "fail to list score" })
    }
}