
const Home = require('../models/homemanage')
const ReGiscourse = require('../models/registerCourse')
const fs = require("fs");

exports.carousel = async (req, res) => {
    try {
        const filename = req.file.filename;
        const { id } = req.body
        // const hoe = new Home({
        //     carousel:[
        //         filename,filename,filename
        //     ],
        //     coursee:"63fc557ea6ac3a6bd778a1d3",
        //     register:"63fc557ea6ac3a6bd778a1d3"
        // })
        // await hoe.save()
        const carousel = await Home.findOne({ _id: id }).exec()
        if (carousel.carousel.length >= 3) {
            res.status(400).send("img is full")
        } else {

            carousel.carousel.push(filename)
            const newcarousel = await Home.findOneAndUpdate({ _id: id }, { carousel: carousel.carousel })
            res.send(newcarousel)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on carousel')
    }
}
exports.course = async (req, res) => {
    try {

        const { id_course, id } = req.body
        const courselist = await Home.findOne({ _id: id }).exec()
        if (courselist.coursee.length >= 5) {
            res.status(400).send("course is full")
        } else {

            courselist.coursee.push(id_course)
            const newcourselist = await Home.findOneAndUpdate({ _id: id }, { coursee: courselist.coursee })
            res.send(newcourselist)
        }

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on course')
    }
}
exports.ReGiscourse = async (req, res) => {
    try {

        const { id_course, id } = req.body
        const courselist = await ReGiscourse.findOne({ _id: id }).exec()
        if (courselist.coursee.length >= 5) {
            res.status(400).send("course is full")
        } else {

            courselist.coursee.push(id_course)
            const newcourselist = await ReGiscourse.findOneAndUpdate({ _id: id }, { coursee: courselist.coursee })
            res.send(newcourselist)
        }
      
    
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on ReGiscourse')
    }
}
exports.listHome = async (req, res) => {
    try {
        const home = await Home.find({})
        .populate("coursee")
        .exec()
        const regis = await ReGiscourse.find({})
        .populate("coursee")
        .exec()
        res.send({home:home,regis:regis})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list home')
    }
}
exports.removeCarousel = async (req, res) => {
    try {
        // const home = await Home.find({}).exec()
        const carousel = await Home.findOne({ _id: req.body.id })

        await fs.unlink("./public/uploads/" + carousel.carousel[req.body.index], (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("remove Success");
            }
        });

        carousel.carousel.splice(req.body.index, 1)

        const update = await Home.findOneAndUpdate(
            { _id: req.body.id },
            { carousel: carousel.carousel }
        )
        res.send(update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove carousel')
    }
}
exports.removeCourse = async (req, res) => {
    try {
        // const home = await Home.find({}).exec()
        const Course = await Home.findOne({ _id: req.body.id })

        Course.coursee.splice(req.body.index, 1)

        const update = await Home.findOneAndUpdate(
            { _id: req.body.id },
            { coursee: Course.coursee }
        )

        res.send(update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove Course')
    }
}
exports.removeCourse2 = async (req, res) => {
    try {
        // const home = await Home.find({}).exec()
        const Course = await ReGiscourse.findOne({ _id: req.body.id })

        Course.coursee.splice(req.body.index, 1)

        const update = await ReGiscourse.findOneAndUpdate(
            { _id: req.body.id },
            { coursee: Course.coursee }
        )

        res.send(update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove Re Course')
    }
}