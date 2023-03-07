
const User = require('../models/userModel')
const Course = require('../models/course')
const ResetPassword = require("../models/resetPassword")
const nodeMailer = require("nodemailer")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId;
const UserValiation = require("../validation/userValidation")

//สมัครสมาชิก

exports.register = async (req, res) => {
  try {
    // const validated_result = await UserValiation.registerValidate(req)
    // if (!validated_result.valid) return res.status(400).send(validated_result);

    const {
      employee_ID,
      password,
      department_ID,
      email,
      firstname,
      lastname,
      plant,
    } = req.body 
    // validated_result.data.body

    //ตรวจสอบว่าเป็นสมาชิกหรือยัง
    let user = await User.findOne({ employee_ID })
    if (user) {
      return res.status(400).send("User already");
    }

    if (email.length > 0) {
      const query_email = await User.findOne({ email: email }).exec()
      if (query_email) {
        return res.status(400).send("This email has been used");
      }
    }

    user = new User({
      employee_ID,
      password,
      department_ID,
      email,
      firstname,
      lastname,
      plant
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //register
    await user.save();
    res.send('register Success')

  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error!!! on Register')
  }
}

//เข้าสู่ระบบ
exports.login = async (req, res) => {
  try {
    const validated_result = await UserValiation.loginValidate(req)
    if (!validated_result.valid) return res.status(400).send(validated_result);

    const { employee_ID, password } = validated_result.data.body;
    var user = await User.findOneAndUpdate({ employee_ID }, { new: true });
    if (user && user.enabled) {

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }

      // user_id = user._id.toString();
      const Payload = {
        user: {
          fisrtname: user.firstname,
          role: user.role,
          user_id: user._id,
        },
      };

      // Generate Token Time_limit( 1 day )
      jwt.sign(Payload, "jwtSecret", { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;
        res.json({ token, Payload });
      });
    }
    else if (user && user.enabled === false) {
      return res.status(400).send("User not active!!! Please contact admin");
    }
    else {
      return res.status(400).send("User not found!!!");
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on Login");
  }
};


//ตรวจสอบผู้ใช้ปัจจุบัน
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user_id })
      .select("-password")
      .exec();
    console.log("USer: ", user)
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on current user");
  }
};

exports.getTeacherByCourseId = async (req, res) => {
  try {
    const { course_id } = req.body
    const course = await Course.findOne({ _id: course_id })
      .populate("teacher")
      .select("-password")
      .exec();
    // console.log(course)
    let data = {
      _id: course.teacher._id,
      firstname: course.teacher.firstname,
      lastname: course.teacher.lastname,
    }
    res.send(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on get teacher by ID");
  }
};

exports.sendEmail = async (req, res) => {

  try {
    console.log(req)
    const validated_result = await UserValiation.sendEmailValidate(req)
    if (!validated_result.valid) return res.status(400).send(validated_result);

    const { email } = validated_result.data.body
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'densoeleaning@gmail.com',
        pass: 'hqqabmpdjxmqsevf'
      }
    });
    const token = jwt.sign({ email: email }, "jwtSecret", { expiresIn: '5m' });
    const reset_password_data = await ResetPassword.findOne({ email: email }).exec()

    let isTokenExpire = true;
    if (reset_password_data) {
      jwt.verify(reset_password_data.token, "jwtSecret", (err, _) => {
        if (!err) {
          isTokenExpire = false;
          return res.status(500).send("cannot reset password because previous token is not expire");
        }
      });
      // return res.status(500).send("cannot reset password because previous token is not expire");
    }

    if (isTokenExpire && reset_password_data) {
      await ResetPassword.findOneAndDelete({ email: email }).exec()
    }

    if (isTokenExpire) {
      const reset_password_request = new ResetPassword({
        email: email,
        token: token,
        is_used: false
      })
      await reset_password_request.save()


      var mailOptions = {
        from: 'densoeleaning@gmail.com',
        to: email,
        subject: 'Reseting your elearning password',
        html: `
                <html>
                <h1>Do not delete this email utill you reseted your password</h1>
                <h1> Click the button below to link to reset password page <h1>
                <a href="http://localhost:3000/reset-password/${token}"> click </a>
                </html>
                `
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send("send email success")
        }
      });
    }
  }
  catch (err) {
    console.log(err);
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const validated_req = await UserValiation.resetPasswordValidate(req)
    if (validated_req === null) return res.status(400).send("invalid reset password request");

    const userEmail = req.body.email;
    const decoded = jwt.verify(req.headers.authtoken, "jwtSecret");
    const tokenEmail = decoded.email;

    const reset_password_data = await ResetPassword.findOne({ token: req.headers.authtoken }).exec()
    // console.log(req)
    if (reset_password_data) {
      if (reset_password_data.is_used) {
        return res.status(500).send("Cannot reset password because previous token is not expire")
      }
    }
    else {
      return res.status(500).send("Must send rest password request first")
    }

    if (userEmail === tokenEmail) {
      await ResetPassword.findOneAndDelete({ token: req.headers.authtoken }).exec()
      if (req.body.confirm_new_password === req.body.new_password) {
        const salt = await bcrypt.genSalt(10);
        const encrypted_password = await bcrypt.hash(req.body.confirm_new_password, salt);
        await User.findOneAndUpdate({ email: userEmail }, { password: encrypted_password })
        return res.send("OK")
      }
      else {
        return res.status(500).send("New password and Confirm new password are not the same")
      }

    }
    else {
      return res.status(500).send("Entered email does not match with email that server send to")
    }


  }
  catch (err) {
    console.log(err);
  }
}

exports.checkToken = async (req, res) => {
  try {
    console.log(req.headers)
    const validated_req = await UserValiation.checkTokenValidate(req)
    if (validated_req === null) return res.status(400).send("invalid token request");

    const reset_password_data = await ResetPassword.findOne({ token: req.headers.authtoken }).exec()
    if (!reset_password_data) {
      return res.json({ isValid: false })
    }

    jwt.verify(req.headers.authtoken, "jwtSecret", (err, _) => {
      if (err) res.json({ isValid: false });
      return res.json({ isValid: true });
    });

  }
  catch (err) {
    console.log(err);
  }
}

exports.checkRole = async (req, res) => {
  try {
    res.send(req.user.role)
  }
  catch (err) {
    console.log(err);
  }
}
exports.getMyaccount = async (req, res) => {
  try {

    const user = await User.findOne({ _id: req.user.user_id }).exec()
    // console.log(req.user.user_id)
    // console.log(user)
    res.send(user)
  }
  catch (err) {
    console.log(err);
    res.status(500).send("error on get account")
  }
}
exports.uploadProfile = async (req, res) => {
  try {

    const filename = req.file.filename;
    const { email, tel } = req.body

    const user = await User.findOneAndUpdate(
      { _id: req.user.user_id },
      {
        profile: filename,
        email: email,
        tel: tel
      }
    ).exec()
    // console.log(req.user.user_id)
    // console.log(user)
    res.send(user)
  }
  catch (err) {
    console.log(err);
    res.status(500).send("error on uploadProfile")
  }
}
exports.updateProfile = async (req, res) => {
  try {

    const { email, tel } = req.body

    const user = await User.findOneAndUpdate(
      { _id: req.user.user_id },
      {
        email: email,
        tel: tel
      }
    ).exec()
    res.send(user)

  }
  catch (err) {
    console.log(err);
    res.status(500).send("error on updateProfile")
  }
}

exports.returnRoute = async (req, res) => {
  try {
    console.log(req.user)
    res.send({ status: true, role: req.user.role })
  }
  catch (err) {
    console.log(err);
    res.status(500).send("Error your access denied")
  }
}