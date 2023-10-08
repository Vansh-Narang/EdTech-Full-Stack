import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from '../../../services/Operations/profieApi'
import ProgressBar from "@ramonak/react-progress-bar";
const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token)
            console.log("prinitng enrolled courses", response)
            setEnrolledCourses(response)
        } catch (error) {
            console.log("Unable to get Enrolled Courses", error.message)
        }
    }
    useEffect(() => {
        getEnrolledCourses()
    }, [])

    return (
        <div className='text-white'>
            <div>Enrolled Courses</div>
            {
                !enrolledCourses ?
                    (<div>Loading....</div>) :
                    (
                        !enrolledCourses.length ? (<p>You are not enrolled in any courses yet</p>) :
                            (
                                < div >
                                    <div>
                                        <p>Course Name</p>
                                        <p>Duration</p>
                                        <p>Progress</p>
                                    </div>
                                    {/* cards shuru hote hain */}
                                    {
                                        enrolledCourses.map((course, index) => {
                                            <div>
                                                <div key={index}>
                                                    <img src={course.thumbnail} alt='Thumbnail Course' />
                                                    <div >
                                                        <p>{course.courseName}</p>
                                                        <p>{course.courseDescription}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {course?.totalDuration}
                                                </div>
                                                <div>
                                                    <p>Progress {course.progressPercentage || 0}%</p>
                                                    <ProgressBar
                                                        completed={course.progressPercentage || 0}
                                                        height='8px'
                                                        isLabelVisible={false}
                                                    />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            )
                    )
            }
        </div >
    )
}

export default EnrolledCourses
