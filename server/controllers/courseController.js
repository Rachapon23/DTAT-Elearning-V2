
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require("fs");
const Coursee = require('../models/course')
const Layout = require('../models/layout')
const Calendar = require('../models/calendar')
const User = require('../models/userModel')
const CourseValidation = require("../validation/courseValidation")

exports.createCourse = async (req, res) => {
    try {
        // const validated_result = await CourseValidation.createCourseValidate(req);
        // if(!validated_result.valid) return res.status(400).send(validated_result);


        const { head, body } = req.body// validated_result.data.body


        const status = "public"
        const course = new Coursee(
            {
                name: head.name,
                description: head.description,
                course_number: head.course_number,
                password: head.password,
                teacher: head.teacher,
                status: status,
                topic: body,

            }
        )

        await course.save()
        res.send(course)

        console.log(req.body)
        res.send('OK corse Private')


    }
    catch (err) {
        console.log("fail to create the course : ", err);
        res.status(500).json({ error: "fail to create the course" })
    }
}



exports.listCourses = async (req, res) => {
    try {

        await Coursee.find({}).populate("teacher", "-password")
            .exec((err, courses) => {
                res.json(courses);
            });

    }
    catch (err) {
        console.log("fail to fetch courses");
        res.status(500).json({ error: "fail to fetch courses" });
    }
}

exports.publicCourses = async (req, res) => {
    try {
        await Coursee.find({ status: "public" })
            .exec((err, courses) => {
                res.json(courses);
            });

    }
    catch (err) {
        console.log("fail to fetch courses");
        res.status(500).json({ error: "fail to fetch courses" });
    }
}

exports.getCourse = async (req, res) => {
    try {
        // console.log(req.params)
        const { id } = req.params
        const course = await Coursee.findOne({ _id: id })
            .populate('teacher room')
            .exec()
        res.send(course)
    }
    catch (err) {
        console.log("fail to get courses");
        res.status(500).json({ error: "fail to get courses" });
    }
}

exports.searchCourse = async (req, res) => {
    try {
        const { query } = req.body
        // console.log(query)
        let courseSearch = await Coursee.find({ course_number: { $regex: query }, status: "private" }).populate("teacher", "firstname").exec()
        //$text:{$search:"110011"}
        res.send(courseSearch)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on searchCourse");
    }
}

exports.addCourse = async (req, res) => {
    try {
        const { id, id_user, password } = req.body


        let user = await User.findOne({ _id: id_user }).exec()

        for (let i = 0; i < user.coursee.length; i++) {
            if (user.coursee[i] == id) {
                return res.status(400).send("course already exist");
            }
        }

        user.coursee.push(id)
        const user_push = user.coursee
        const courseSearch = await Coursee.findOne({ _id: id }).exec()
        // console.log(courseSearch.password)

        if (password == courseSearch.password) {
            // console.log('math')

            const user_update = await User.findByIdAndUpdate(
                { _id: id_user },
                { coursee: user_push }
            ).exec()
            res.send(user_update)

        } else {
            return res.status(400).send("Password Invalid!!!");
        }
        // res.send("ok")

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on AddCourse");
    }
}


exports.getMyCourse = async (req, res) => {
    try {

        const { id } = req.params
        const user = await User.findOne({ _id: id })
            .populate("coursee")
            .select("coursee")
            .exec()
        res.send(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on getMyCourse");
    }
}


exports.deleteMyCourse = async (req, res) => {
    try {
        const { id } = req.params
        const { user_id } = req.body
        const { coursee } = await User.findOne({ _id: user_id })
            .select("coursee")
            .exec()
        // console.log("before:",coursee)
        for (let i = 0; i < coursee.length; i++) {

            if (coursee[i] == id) {
                //   console.log(course[i],"--",id)  
                coursee.splice(coursee.indexOf(coursee[i]), 1);

            }
        }
        // console.log("after:",coursee)
        const user_update = await User.findByIdAndUpdate(
            { _id: user_id },
            { coursee: coursee }
        ).exec()
        // console.log(id,user_id)
        res.send(user_update)
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on  deleteMyCourse");
    }
}

exports.getMyCourseTeacher = async (req, res) => {
    try {
        const { user_id } = req.user
        const user = await User.findOne({ _id: user_id }).exec()

        if (user.role === "admin") {
            const courses = await Coursee.find({}).populate("teacher", "-password").exec()
            return res.send(courses)
        }
        else {
            const courses = await Coursee.find({ teacher: user_id }).populate("teacher", "-password").exec()
            return res.send(courses)
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error!!! on getMyCourse");
    }
}
exports.updateCourse = async (req, res) => {
    try {
        const { head, body } = req.body
        const course = await Coursee.findOne({ _id: head._id }).exec()
        const topic_after = course.topic
        const upload = []
        let respond = {
            data: [],
            upload: []
        }

        for (let i = 0; i < topic_after.length; i++) {
            for (let j = 0; j < topic_after[i].file.length; j++) {
                for (let k = 0; k < body.length; k++) {
                    for (let l = 0; l < body[k].file.length; l++) {
                        if (
                            topic_after[i].file[j].filename ==
                            body[k].file[l].filename
                        ) {
                            // console.log(topic_after[i].file[j].filename)
                            topic_after[i].file[j].filename = ""
                            // body[k].file[l].filename = ""
                        }
                    }
                }
            }
        }

        for (let i = 0; i < topic_after.length; i++) {
            for (let j = 0; j < topic_after[i].file.length; j++) {
                // console.log("the last", topic_after[i].file[j]) 
                if (topic_after[i].file[j].filename !== '') {
                    // console.log("delete : ",topic_after[i].file[j].filename)
                    await fs.unlink("./public/uploads/" + topic_after[i].file[j].filename, (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("delete IMG from server success")
                        }
                    });
                }
            }
        }

        for (let i = 0; i < body.length; i++) {
            for (let j = 0; j < body[i].file.length; j++) {
                // console.log(!!(body[i].file[j]).file)
                if (!!(body[i].file[j]).file) {
                    upload.push(
                        {
                            topic_number: i,
                            file_number: j
                        }
                    )
                }
                //     if(body[i].file[j].filename !== ''){
                //    console.log("new ---- ",body[i].file[j])
                //     }
            }
        }

        const deleteIMG = await Coursee.findOne({ _id: head._id }).exec()

        if (!deleteIMG.image) {
            //false have
            console.log(head.image, "no have no delete")
            const course = await Coursee.findOneAndUpdate(
                { _id: head._id }
                , {
                    new: true,
                    name: head.name,
                    description: head.description,
                    course_number: head.course_number,
                    password: head.password,
                    room: head.room,
                    topic: body
                },
            ).exec()
            // res.send(course)
            respond = {
                data: course,
                upload: upload
            }

        } else {
            //true not have
            if (!head.image) {


                console.log(deleteIMG.image, "delete")
                await fs.unlink("./public/uploads/" + deleteIMG.image, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("delete IMG from server success")
                    }
                });
                const deleteIMGback = await Coursee.updateMany({ _id: head._id }, { $unset: { image: "" } })
                const course = await Coursee.findOneAndUpdate(
                    { _id: head._id }
                    , {
                        new: true,
                        name: head.name,
                        description: head.description,
                        course_number: head.course_number,
                        password: head.password,
                        room: head.room,
                        topic: body
                    },
                ).exec()
                // res.send(course)
                respond = {
                    data: course,
                    upload: upload
                }

            } else {
                console.log(head.image, "do not delete img")
                const course = await Coursee.findOneAndUpdate(
                    { _id: head._id }
                    , {
                        new: true,
                        name: head.name,
                        description: head.description,
                        course_number: head.course_number,
                        password: head.password,
                        room: head.room,
                        image: head.image,
                        topic: body
                    },
                ).exec()
                // res.send(course)
                respond = {
                    data: course,
                    upload: upload
                }
            }
        }

        res.send(respond)

    }
    catch (err) {
        console.log("fail to update the course topic: ", err);
        res.status(500).json({ error: "fail to update the course topic" })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Coursee.findOne({ _id: req.params.id }).exec()
        const calendar = await Calendar.find({ coursee: course._id })
        await Calendar.deleteMany({ coursee: course._id }).exec((err) => {
            if (err) {
                console.log(err)
                res.status(400).send('err on delete carlendar')
            }
        })

        if (!!course.image) {
            // console.log(course.image)
            await fs.unlink("./public/uploads/" + course.image, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('err on delete img')
                } else {
                    console.log("remove Success");
                }

            });
        }

        // TODO: if file not found in course it cannot delete course 
        // for(let i = 0 ; i < course.topic.length ; i++){
        //     for(let j = 0 ; j <course.topic[i].file.length ; j++ ){
        //         console.log("name : ",course.topic[i].file[j].filename)
        //         await fs.unlink("./public/uploads/" + course.topic[i].file[j].filename, (err) => {
        //                     if (err) {
        //                         console.log(err);
        //                         res.status(400).send('err on delete file')
        //                     } else {
        //                         console.log("remove file Success");
        //                     }

        //                 });
        //     }
        // }

        const course_delete = await Coursee.findOneAndDelete({ _id: req.params.id }).exec()
        res.send(course_delete)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on remove course')
    }
}

exports.getRoom = async (req, res) => {
    try {
        const room = await Layout.find({}).exec()
        res.send(room)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on list room')
    }
}

exports.createRoom = async (req, res) => {
    try {
        const room = await Layout.insertMany(req.body)
        // console.log(req.body)
        res.send(room)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on create Room')
    }
}
exports.uploadimg = async (req, res) => {
    try {
        const id = req.body.id;
        const filename = req.file.filename;

        // console.log(filename, id)
        const upload = await Coursee.findOneAndUpdate(
            { _id: id },
            { image: filename }
        )
        res.send(upload)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on upload img')
    }
}

exports.updateimg = async (req, res) => {
    try {
        const id = req.body.id;
        const filename = req.file.filename;

        const img = await Coursee.findOne({ _id: id }).exec()
        console.log(img.image)

        await fs.unlink("./public/uploads/" + img.image, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("remove Success");
            }
        });

        const update = await Coursee.findOneAndUpdate(
            { _id: id },
            { image: filename }
        )
        res.send(update)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on upload img')
    }
}

exports.uploadfile = async (req, res) => {
    try {
        const { id, file_number, topic_number } = req.body;
        const filename = req.file.filename;

        // console.log(id, file_number,topic_number  )


        const course = await Coursee.findOne({ _id: id }).exec()

        const type = course.topic[topic_number].file[file_number].type
        const name = course.topic[topic_number].file[file_number].name
        const filetype = course.topic[topic_number].file[file_number].filetype

        const file_new = {
            type: type,
            name: name,
            filetype: filetype,
            filename: filename,
        }

        course.topic[topic_number].file[file_number] = file_new

        console.log("course : === ", course.topic[topic_number].file[file_number])


        const update = await Coursee.findOneAndUpdate(
            { _id: id },
            { topic: course.topic }
        ).exec()

        res.send("update")

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on upload img')
    }
}
exports.enablecourse = async (req, res) => {
    try {
        const { id, enable } = req.body;
        console.log(id, enable)


        const update = await Coursee.findOneAndUpdate(
            { _id: id },
            { enabled: enable }
        ).exec()

        res.send(update)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!!! on enablecourse')
    }
}
