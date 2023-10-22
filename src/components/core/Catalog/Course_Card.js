import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import RatingStars from "../../Common/RatingStars"
import GetAvgRating from "../../../utils/averageRating"
import thumbnail from "../../../assets/asset 5.png"
const Course_Card = ({ course, Height }) => {

    const [avgReviewCount, setAverageReviewCount] = useState(0)



    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews)
        setAverageReviewCount(count)
    }, [course])
    return (
        <div className='text-white'>
            {/* <h1>{course}</h1> */}
            <Link to={`/courses/${course._id}`}>
                <div >
                    <div>
                        <img src={course?.thumbnail || thumbnail} alt='thumbnail' className={`${Height} w-full rounded-xl object-cover text-white`} />
                    </div>
                    <div>
                        <p className='text-xl font-medium my-2'>{course?.courseName}</p>
                        <p className='text-xl font-medium'>{course?.instructor?.firstName} {course?.instructor?.lastName} </p>
                        <div className='flex gap-x-5'>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='font-semibold text-xl tracking-wide'>Rs {course?.price} </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card
