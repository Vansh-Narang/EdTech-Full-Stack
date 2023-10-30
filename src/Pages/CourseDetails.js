import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from '../services/Operations/studentFeaturesAPI'
import { fetchCourseDetails } from "../services/Operations/CourseDetails"
import GetAvgRating from "../utils/averageRating"
import ConfirmationModal from "../components/Common/ConfirmationModal"
import Error from "../Pages/Error"
import RatingStars from "../components/Common/RatingStars"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { courseId } = useParams()
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)

    const [response, setResponse] = useState(null)
    const [courseData, setCourseData] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)
    useEffect(() => {
        //saare course ki details backend me hai function
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails("653e88e53f37930a20db2c38");
                console.log("Result: " + result)
                setCourseData(result)
            } catch (error) {
                console.log("Couldnot fetch course details")
            }
        }
        getCourseFullDetails();
    }, [courseId])

    //get rating wala function
    const [avgReviewCount, setavgReviewCount] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setavgReviewCount(count);
    }, [courseData])


    const [totalNoofLectures, setTotalNoofLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoofLectures(lectures)
    }, [courseData])

    //to buy update
    const handleBuyCourse = () => {
        // console.log("hellooooooooooooo")
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return;
        }
        //not login user trying to buy course
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if (loading || !courseData) {
        return <div className='text-white'>
            Loading ...
        </div>
    }
    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }
    console.log("course data: " + courseData)
    const {
        // _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        studentsEnrolled,
        instructor,
        createdAt
    } = courseData.data?.courseDetails

    //means empty array (saare close by default)
    const [isActive, setIsActive] = useState(Array(0))


    const handleClick = (id) => {
        setIsActive(
            //agar nahi includes hai array me to include kro agar hai to exclude it
            //(basically it is a toggle array)
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e != id)
        )
    }
    return (
        <div className='flex flex-col items-center text-white'>
            <div className='relative flex flex-col justify-start p-8'>
                <p>{courseName}</p>
                <p>{courseDescription}</p>
                <div className='text-white flex gap-x-2'>
                    <span> {avgReviewCount}</span>
                    <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                    <span>{`(${ratingAndReviews.length} reviews)`}</span>
                    <span>{`(${studentsEnrolled.length} students Enrolled)`}</span>
                </div>
                <div>
                    <p>Created by {`${instructor.firstName}`}</p>
                </div>
                <div className='flex gap-x-3'>
                    <p>
                        Created at {formatDate(createdAt)}
                    </p>
                    <p>
                        {" "} English
                    </p>
                </div>
                <div>
                    <CourseDetailsCard
                        course={courseData?.data?.courseDetails}
                        setConfirmationModal={setConfirmationModal}
                        handleBuyCourse={handleBuyCourse}
                    />
                </div>
                <div>
                    <p>What you will learn</p>
                    <div>
                        {whatYouWillLearn}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p>Course Content :</p>
                </div>
                <div className='flex gap-x-3 justify-between'>
                    <div>
                        <span>{courseContent.length} sections</span>
                        <span>
                            {totalNoofLectures.length} lectures
                        </span>
                        <span>
                            {courseData?.data?.totalDuration} total Length
                        </span>
                        <div>
                            {/* set is active will be empty if clicked on collapse all sections as it will remove them from active state */}
                            <button onClick={() => setIsActive([])}>
                                Collapse all sections
                            </button>
                        </div>
                    </div>


                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseDetails
