import React from 'react'
import HighlightText from './HighlightText'
import InstructorImage from "../../../assets/asset 9.png"
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from "react-icons/fa"
function Instructor() {
    return (
        <div className='mt-16'>
            <div className='flex flex-row gap-20 items-center'>
                <div className="w-[50%]">
                    <img src={InstructorImage} alt="Instructorimg" className='shadow-white' />
                </div>
                <div className="flex flex-col gap-10 w-[50%]">
                    <div className='text-4xl font-semibold w-[50%]'>
                        Become an
                        <HighlightText text={"Instructor"} />
                    </div>
                    <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signup"} >
                            <div className='flex w-fit items-center'>
                                Start teaching today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Instructor