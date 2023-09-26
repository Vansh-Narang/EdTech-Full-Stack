import React from 'react'
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
function Home() {

    return (
        <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent
         text-white justify-between'>

            {/* Section 1  */}
            <Link to="signup">
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                    transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 
                        py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>


            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur  dolor sit amet, consectetur lorem ipsum dolor sit amet,
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
            {/* Section 2  */}
            {/* Section 3  */}
            {/* Footer 4  */}

        </div>
    )
}

export default Home