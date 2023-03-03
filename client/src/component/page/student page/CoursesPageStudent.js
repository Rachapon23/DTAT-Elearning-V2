import NavStudent from "../../layout/NavStudent"
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import {listCourses} from "../../../function/funcFromStudent";


const CoursePageStudent = () => {

    const [courses, setCourses] = useState([]);

    const fetchData = () => {
        // listCourses()
        // .then((response) => {
        //     console.log(response)
        //     setCourses(response.data)
        // })
        // .catch((err) => {
        //     console.log(err)
        //     Swal.fire(
        //         "Alert!",
        //         "Cannot fetch blogs data",
        //         "error"
        //     )
        // })
    }

    useEffect(() => {
        fetchData()
      }, [])

    return (
        <div>
            <NavStudent/>
            {/* {JSON.stringify(courses)} */}
            <div className="container">
                {
                    courses.map((course, index) => (
                        <div className="row p-3 bg-white border mt-3" key={index}>
                            <div className="col pt-3 pb-2">
                                <Link to={`/student/get-course/${course._id}`}><h2>{course.name}</h2></Link>
                                <p>{(course.description.substring(0,200))}...</p>
                                <p className="text-muted">Teacher {course.teacher.firstname}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CoursePageStudent;