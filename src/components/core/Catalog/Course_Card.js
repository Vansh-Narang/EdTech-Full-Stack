import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import RatingStars from "../../Common/RatingStars"
import GetAvgRating from "../../../utils/averageRating"
import thumbnail from "../../../assets/asset 0.png"
const Course_Card = ({ course, Height }) => {

    const [avgReviewCount, setAverageReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews)
        setAverageReviewCount(count)
    }, [course])



    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div>
                        <img src={thumbnail} alt='thumbnail' className={`${Height} w-full rounded-xl object-cover text-white`} />
                    </div>
                    <div>
                        <p>{course.courseName}</p>
                        <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p>{course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card
