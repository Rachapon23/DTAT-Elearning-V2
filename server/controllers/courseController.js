const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const Coursee = require("../models/course");
const Layout = require("../models/layout");
const Plant = require("../models/plant");
const Calendar = require("../models/calendar");
const User = require("../models/userModel");
const History = require('../models/history');
const Quiz = require("../models/quize");
const CourseValidation = require("../validation/courseValidation");
// const Examiner = require("../models/examiner")
const studentActivity = require('../models/studentActivity')

exports.createCourse = async (req, res) => {
  try {
    // const validated_result = await CourseValidation.createCourseValidate(req);
    // if(!validated_result.valid) return res.status(400).send(validated_result);

    const { head, body } = req.body;

    const course = new Coursee({
      name: head.name,
      description: head.description,
      quiz: head.quiz,
      member: head.member,
      calendar: head.calendar,
      statuscourse: head.statuscourse,
      room: head.room,
      teacher: head.teacher,
      topic: body,
      video_amount: 0,
    });

    await course.save();
    res.send(course);

    // console.log(course);
    // res.send("OK corse Private");
  } catch (err) {
    console.log("fail to create the course : ", err);
    res.status(500).json({ error: "fail to create the course" });
  }
};

exports.listCourses = async (req, res) => {
  try {
    await Coursee.find({})
      .populate("teacher", "-password")
      .exec((err, courses) => {
        res.json(courses);
      });
  } catch (err) {
    console.log("fail to fetch courses");
    res.status(500).json({ error: "fail to fetch courses" });
  }
};

exports.publicCourses = async (req, res) => {
  try {
    await Coursee.find({ status: "public" }).exec((err, courses) => {
      res.json(courses);
    });
  } catch (err) {
    console.log("fail to fetch courses");
    res.status(500).json({ error: "fail to fetch courses" });
  }
};

exports.getCourse = async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params;
    const course = await Coursee.findOne({ _id: id })
      .populate("teacher room")
      .exec();
    res.send(course);
  } catch (err) {
    console.log("fail to get courses");
    res.status(500).json({ error: "fail to get courses" });
  }
};
exports.getUserCourse = async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params;
    console.log(id)
    const data = await studentActivity.find({ coursee: id })
      .populate("user coursee quiz")
      .exec()
    // console.log(data)
    // res.send({user:data.user,course:data.coursee,quiz:data.quiz,data:data});
    res.send(data)
  } catch (err) {
    console.log("fail to get courses");
    res.status(500).json({ error: "fail to get getUserCourse" });
  }
};

exports.searchCourse = async (req, res) => {
  try {
    const { query } = req.body;
    // console.log(query)
    let courseSearch = await Coursee.find({
      course_number: { $regex: query },
      status: "private",
    })
      .populate("teacher", "firstname")
      .exec();
    //$text:{$search:"110011"}
    res.send(courseSearch);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on searchCourse");
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { id } = req.body;
    const { user_id } = req.user;

    let user = await User.findOne({ _id: user_id }).exec();
    const course = await Coursee.findOne({ _id: id }).exec();

    let plus = false;
    console.log(course, user)
    for (let i = 0; i < course.member.length; i++) {
      if (course.member[i].plant == user.plant) {
        // console.log(course.member[i].plant, user.plant)
        plus = true
        if (course.member[i].amount <= course.member[i].registerd) {
          return res.status(400).send(`amount ${course.member[i].plant} is max`)
        } else {
          course.member[i].registerd = course.member[i].registerd + 1
        }

      }
    }
    if (!plus) {
      return res.status(400).send(`plant not math`)
    }

    for (let i = 0; i < user.coursee.length; i++) {
      if (user.coursee[i] == id) {
        return res.status(400).send("course already exist");
      }
    }

    course.user.push(user_id);
    const course_push = course.user;
    user.coursee.push(id);
    const user_push = user.coursee;


    console.log(course)
    const activity = new studentActivity({
      user: user_id,
      coursee: id,
      quiz: course.quiz
    })

    await activity.save()

    // console.log(course.member)
    const newCourse = await Coursee.findOneAndUpdate(
      { _id: id },
      { user: course_push, member: course.member }
      // {member: course.member}
    ).exec();

    const newUser = await User.findOneAndUpdate(
      { _id: user_id },
      { coursee: user_push }
    ).exec();

    //************************ */

    res.send({ user: newUser, course: newCourse, studentActivity: activity });
    // res.send("{user:newUser,course:newCourse}");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on AddCourse");
  }
};

exports.getMyCourse = async (req, res) => {
  try {
    // const { id } = req.params;
    const user = await User.findOne({ _id: req.user.user_id })
      .populate("coursee history")
      // .select("coursee")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getMyCourse");
  }
};


exports.deleteMyCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const { coursee } = await User.findOne({ _id: user_id })
      .select("coursee")
      .exec();
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
    ).exec();
    // console.log(id,user_id)
    res.send(user_update);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on  deleteMyCourse");
  }
};

exports.getMyCourseTeacher = async (req, res) => {
  try {
    const { user_id } = req.user;
    const user = await User.findOne({ _id: user_id }).exec();

    if (user.role === "admin") {
      const courses = await Coursee.find({})
        .populate("teacher", "-password")
        .exec();
      return res.send(courses);
    } else {
      const courses = await Coursee.find({ teacher: user_id })
        .populate("teacher", "-password")
        .exec();
      return res.send(courses);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getMyCourse");
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const { head, body } = req.body;
    const course = await Coursee.findOne({ _id: head._id }).exec();
    const topic_after = course.topic;
    const upload = [];
    let respond = {
      data: [],
      upload: [],
    };

    for (let i = 0; i < topic_after.length; i++) {
      for (let j = 0; j < topic_after[i].file.length; j++) {
        for (let k = 0; k < body.length; k++) {
          for (let l = 0; l < body[k].file.length; l++) {
            if (topic_after[i].file[j].filename == body[k].file[l].filename) {
              // console.log(topic_after[i].file[j].filename)
              topic_after[i].file[j].filename = "";
              // body[k].file[l].filename = ""
            }
          }
        }
      }
    }


    let video_amount = 0;
    for (let i = 0; i < topic_after.length; i++) {
      for (let j = 0; j < topic_after[i].file.length; j++) {
        // console.log("the last", topic_after[i].file[j])
        if (topic_after[i].file[j].filename !== "") {
          if (topic_after[i].file[j].filetype === "video/mp4") video_amount++;
          await fs.unlink(
            "./public/uploads/" + topic_after[i].file[j].filename,
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("delete IMG from server success");
              }
            }
          );
        }
      }
    }

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < body[i].file.length; j++) {
        // console.log(!!(body[i].file[j]).file)
        if (!!body[i].file[j].file) {
          upload.push({
            topic_number: i,
            file_number: j,
          });
        }
        //     if(body[i].file[j].filename !== ''){
        //    console.log("new ---- ",body[i].file[j])
        //     }
      }
    }

    const deleteIMG = await Coursee.findOne({ _id: head._id }).exec();

    if (!deleteIMG.image) {
      //false have
      console.log(head.image, "no have no delete");
      const course = await Coursee.findOneAndUpdate(
        { _id: head._id },
        {
          new: true,
          name: head.name,
          description: head.description,
          // course_number: head.course_number,
          // password: head.password,
          member: head.member,
          calendar: head.calendar,
          room: head.room,
          topic: body,
        }
      ).exec();
      // res.send(course)
      respond = {
        data: course,
        upload: upload,
        video_amount: video_amount,
      };
    } else {
      //true not have
      if (!head.image) {
        console.log(deleteIMG.image, "delete");
        await fs.unlink("./public/uploads/" + deleteIMG.image, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("delete IMG from server success");
          }
        });
        const deleteIMGback = await Coursee.updateMany(
          { _id: head._id },
          { $unset: { image: "" } }
        );
        const course = await Coursee.findOneAndUpdate(
          { _id: head._id },
          {
            new: true,
            name: head.name,
            description: head.description,
            // course_number: head.course_number,
            // password: head.password,
            member: head.member,
            calendar: head.calendar,
            room: head.room,
            topic: body,
          }
        ).exec();
        // res.send(course)
        respond = {
          data: course,
          upload: upload,
          video_amount: video_amount,
        };
      } else {
        console.log(head.image, "do not delete img");
        const course = await Coursee.findOneAndUpdate(
          { _id: head._id },
          {
            new: true,
            name: head.name,
            description: head.description,
            // course_number: head.course_number,
            // password: head.password,
            member: head.member,
            calendar: head.calendar,
            room: head.room,
            image: head.image,
            topic: body,
          }
        ).exec();
        // res.send(course)
        respond = {
          data: course,
          upload: upload,
          video_amount: video_amount,
        };
      }
    }

    res.send(respond);
  } catch (err) {
    console.log("fail to update the course topic: ", err);
    res.status(500).json({ error: "fail to update the course topic" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Coursee.findOne({ _id: req.params.id }).exec();
    const calendar = await Calendar.find({ coursee: course._id });
    await Quiz.findOne({ course: course._id }).exec();
    await Calendar.deleteMany({ coursee: course._id }).exec((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send("err on delete carlendar");
      }
    });

    if (!!course.image) {
      // console.log(course.image)
      await fs.unlink("./public/uploads/" + course.image, (err) => {
        if (err) {
          console.log(err);
          res.status(400).send("err on delete img");
        } else {
          console.log("remove Success");
        }
      });
    }

    const deleteActivity = await studentActivity.deleteMany({ coursee: req.params.id })

    // TODO: if file not found in course it cannot delete course
    for (let i = 0; i < course.topic.length; i++) {
      for (let j = 0; j < course.topic[i].file.length; j++) {
        console.log("name : ", course.topic[i].file[j].filename)
        await fs.unlink("./public/uploads/" + course.topic[i].file[j].filename, (err) => {
          if (err) {
            console.log(err);
            res.status(400).send('err on delete file')
          } else {
            console.log("remove file Success");
          }

        });
      }
    }

    const course_delete = await Coursee.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.send(course_delete);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error!!! on remove course");
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Layout.find({}).exec();
    res.send(room);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list room");
  }
};
exports.getPlant = async (req, res) => {
  try {
    const plant = await Plant.find({}).exec();
    res.send(plant);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on list plant");
  }
};

exports.uploadimg = async (req, res) => {
  try {
    const id = req.body.id;
    const filename = req.file.filename;

    // console.log(filename, id)
    const upload = await Coursee.findOneAndUpdate(
      { _id: id },
      { image: filename }
    );
    res.send(upload);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on upload img");
  }
};

exports.updateimg = async (req, res) => {
  try {
    const id = req.body.id;
    const filename = req.file.filename;

    const img = await Coursee.findOne({ _id: id }).exec();
    console.log(img.image);

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
    );
    res.send(update);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on upload img");
  }
};

exports.uploadfile = async (req, res) => {
  try {
    const { id, file_number, topic_number } = req.body;
    const filename = req.file.filename;

    // console.log(id, file_number,topic_number  )

    const course = await Coursee.findOne({ _id: id }).exec();

    const type = course.topic[topic_number].file[file_number].type;
    const name = course.topic[topic_number].file[file_number].name;
    const filetype = course.topic[topic_number].file[file_number].filetype;

    const file_new = {
      type: type,
      name: name,
      filetype: filetype,
      filename: filename,
    };

    course.topic[topic_number].file[file_number] = file_new;

    console.log("course : === ", course.topic[topic_number].file[file_number]);

    const update = await Coursee.findOneAndUpdate(
      { _id: id },
      { topic: course.topic }
    ).exec();

    res.send("update");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on upload img");
  }
};
exports.enablecourse = async (req, res) => {
  try {
    const { id, enable } = req.body;
    console.log(id, enable);

    const update = await Coursee.findOneAndUpdate(
      { _id: id },
      { enabled: enable }
    ).exec();

    res.send(update);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on enablecourse");
  }
};

exports.getCourseHome = async (req, res) => {
  try {
    const close = await Coursee.find({ statuscourse: true })
      .populate("teacher", "-password")
      .exec();
    const open = await Coursee.find({ statuscourse: false })
      .populate("teacher", "-password")
      .exec();

    res.send({ close: close, open: open });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on getCourseHome");
  }
};

exports.updateCourseVideoAmount = async (req, res) => {
  try {
    const { id } = req.body
    const { data } = req.body
    console.log("-->>> ", req.body)
    await Coursee.findOneAndUpdate({ _id: id }, { $inc: data })

    res.send("update course data success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on update course data");
  }
};

exports.CourseSuccess = async (req, res) => {
  try {
    const { course, user, activity } = req.body

    const Course = await Coursee.findOne({ _id: course }).exec()
    const Userr = await User.findOne({ _id: user }).exec()
    const teacher = await User.findOne({ _id: req.user.user_id }).exec()
    const Activity = await studentActivity.findOne({ _id: activity }).exec()

    const history = new History({
      result: req.body.result,
      score: Activity.score,
      maxscore: Activity.max_score,
      course: Course.name
    })

    await history.save()

    for (let i = 0; i < Course.user.length; i++) {
      if (Course.user[i] == user) {
        // console.log(Course.user[i] , user)
        Course.user.splice(i, 1);
      }
    }
    for (let i = 0; i < Course.member.length; i++) {
      if (Course.member[i].plant == Userr.plant) {
        // console.log(Course.user[i] , user)
        Course.member[i].registerd = Course.member[i].registerd - 1
      }
    }

    for (let i = 0; i < Userr.coursee.length; i++) {
      if (Userr.coursee[i] == course) {
        // console.log(Course.user[i] , user)
        Userr.coursee.splice(i, 1);
      }
    }

    const activity_delete = await studentActivity.findOneAndDelete(
      { _id: Activity }
    ).exec()

    const update_course = await Coursee.findOneAndUpdate(
      { _id: course },
      {
        user: Course.user,
        member: Course.member
      }
    ).exec()

    Userr.history.push(history._id)
    const update_user = await User.findOneAndUpdate(
      { _id: user },
      { history: Userr.history, coursee: Userr.coursee }
    ).exec()

    const update_teacher = await User.findOneAndUpdate(
      { _id: req.user.user_id },
      { targetstudent: teacher.targetstudent + 1 }
    )

    res.send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on CourseSuccess");
  }
};
