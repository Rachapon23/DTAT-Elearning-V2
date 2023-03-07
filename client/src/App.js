import { Routes, Route } from "react-router-dom";
// //rote
import PrivateUser from "./route/PrivateUser";
// import PrivateTeacher from "./route/PrivateTeacher";
// import Privateadmin from "./route/Privateadmin";
// import Notfound from "./component/page/Notfound";
// //auth
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import ResetPassword from "./component/auth/ResetPassword";
import ResetPasswordRoute from "./route/ResetPasswordRoute";
//admin
import HomePageadmin from "./component/page/admin page/HomeAddmin/HomePageAdmin";
import AlluserFromadmin from "./component/page/admin page/AlluserFromadmin";
import StudentFormAdmin from "./component/page/admin page/StudentFormAdmin";
import TeacherFromAdmin from "./component/page/admin page/TeacherFromAdmin";
import ManageHome from "./component/page/admin page/ManageHome";

// //teacher
import HomePageTeacher from "./component/page/teacher page/HomePageTeacher";
import CoursesPageteacher from "./component/page/teacher page/course/CoursesPageteacher";
import CoursePageteacher from "./component/page/teacher page/course/CoursePageteacher";
// import Quiz from "./component/page/teacher page/quiz/Quiz";
import Course from "./component/page/teacher page/course/Course";
// import EditCourse from "./component/page/teacher page/course/EditCourse";
// import Listquiz from "./component/page/teacher page/quiz/Listquiz";
// import Editquiz from "./component/page/teacher page/quiz/Editquiz";
import Calendar from "./component/page/teacher page/calendar/Calendar";

// //student
import HomePageStudent from "./component/page/student page/HomePageStudent";
// import Dotest from "./component/page/student page/Dotest";
// import CoursesPageStudent from "./component/page/student page/CoursesPageStudent";
// import CoursePageStudent from "./component/page/student page/CoursePageStudent";

// new page
import Home from "./component/home_page/Home";
import HomeCourseOpen from "./component/home_page/HomeCourseOpen";
import HomeCourseClose from "./component/home_page/HomeCourseClose";
import CourseHome from "./component/home_page/course/CourseHome";
import CourseManageUser from "./component/page/teacher page/course/CourseManageUser";
//css
import './App.css'

function App() {

  return (
    <div>

      <Routes>
        {/* auth */}
        {/* <Route path="*" element={<Notfound/>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ResetPasswordRoute />}>
          <Route path="/reset-password/:id" element={<ResetPassword />}></Route>
        </Route>


        {/* admin */}
        {/* <Route element={<Privateadmin />}> */}
          <Route path="/admin/home" element={<HomePageadmin />} />
          <Route path="/admin/managehome" element={<ManageHome />} />
          <Route path="/admin/list-users" element={<AlluserFromadmin />} />
          <Route path="/admin/list-students" element={<StudentFormAdmin />} />
          <Route path="/admin/list-teachers" element={<TeacherFromAdmin />} />
        {/* </Route> */}
 
        {/* teacher */}
        {/* <Route element={<PrivateTeacher />}> */}
          <Route path="/teacher/home" element={<HomePageTeacher />} />
          {/* <Route path="/teacher/quiz" element={<Quiz />} /> */}
          <Route path="/teacher/course" element={<Course />} />
          {/* <Route path="/teacher/edit-course/:id" element={<EditCourse />} />
          <Route path="/teacher/edit-quiz/:id" element={<Editquiz />} />*/}
          {/* <Route path="/teacher/list-quiz" element={<Listquiz />} /> */}
          <Route path="/teacher/list-courses" element={<CoursesPageteacher />} />
          <Route path="/teacher/get-course/:id" element={<CoursePageteacher />} />
          <Route path="/teacher/calendar-teacher" element={<Calendar />} /> 
        {/* </Route> */}

        {/* student */}
        <Route element={<PrivateUser />}>
          <Route path="/student/home" element={<HomePageStudent />} />
        {/*   <Route path="/student/get-course/:id" element={<CoursePageStudent />} />
          <Route path="/student/test/:params" element={<Dotest />} /> */}
          <Route path="/course-home/:id" element={<CourseHome/>} />
        </Route>
        

        
        <Route path="/" element={<Home/>} />
        <Route path="/private-course" element={<HomeCourseClose/>} />
        <Route path="/public-course" element={<HomeCourseOpen/>} />
        <Route path="/teacher/get-course/manageuser/:id" element={<CourseManageUser/>} />

        

      </Routes>
    </div>
  );
}

export default App;
