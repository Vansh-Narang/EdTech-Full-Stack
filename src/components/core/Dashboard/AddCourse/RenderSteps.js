import React from 'react'
import { useSelector } from 'react-redux'
import CourseInformation from './CourseInformation/CourseInformation'
import { FaCheck } from "react-icons/fa"
function RenderSteps() {
    //step ki value nikal li useSelector se course wali slice se
    const { step } = useSelector((state) => state.course)
    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ]
    return (
        <>
            <div>
                {steps.map((item) => (
                    <>
                        <div>
                            <div className={`${step === item.id ? "bg-yellow-900 border-yellow-50"
                                : "border-richblack-700 bg-richblack-800 text-richblue-300"}`} key={item.id}>
                                {
                                    step > item.id ? (<FaCheck />) : (item.id)
                                }
                            </div>
                            {/* add code for dashes between the labels */}
                        </div>
                    </>
                    // match karwayenge id in steps and id in steps slice
                ))}
            </div>
            <div>
                {steps.map((item) => (
                    <>
                        <div>
                            <p>{item.title}</p>
                        </div>
                    </>
                ))}
            </div>
            {step === 1 && <CourseInformation />}
            {/* {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />} */}
        </>
    )
}

export default RenderSteps