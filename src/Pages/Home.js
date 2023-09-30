import "../App.css"
import React from 'react'
import Footer from "../components/Common/Footer"
import { Link } from "react-router-dom"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimeLineSection from "../components/core/HomePage/TimelineSection"
import { FaArrowRight } from "react-icons/fa"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from "../assets/App.mp4"
// import BannerI from "../assets/banner.jpg"
import InstructorSection from "../components/core/HomePage/Instructor"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
function Home() {
    return (
        <>
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

                <div className='mx-3 my-12 shadow-blue-200'>
                    <video muted loop autoPlay>
                        <source src={Banner} type="video/mp4"></source>
                    </video>
                </div>
                {/* Code section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your <HighlightText text={"Coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "
                        }
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }
                        codeblock={
                            // `<<!DOCTYPE HTML>>\n <html>\n<head>>`
                            `<!DOCTYPE html>
                        <html>
                        <head>
                        <title>Title of the document</title>
                        </head>
                        <body>The content of the document......</body>
                        </html>`
                        }
                        codeColor={
                            "text-yellow-25"
                        }


                    />
                </div>
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your <HighlightText text={"Coding potential"} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "
                        }
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>
                        <html>
                        <head>
                        <title>${<HighlightText text={"Title of the document "} />}</title>
                        </head>
                        <body>The content of the document......</body>
                        </html > `
                        }
                        codeColor={
                            "text-yellow-25"
                        }


                    />
                </div>
                {/*/////////////////////// Section 1 completed//////////////////////// */}
            </div>
            {/* Code section 2 */}
            {/* Section 2  */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[310px]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between '>
                        <div className="h-[150px]"></div>
                        <div className='flex flex-row gap-7 text-white '>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                <div className='flex'>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                    <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the skill you need for a <HighlightText text={"Job that is in demand"} />
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div className="text-[16px]">
                                Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum Lorem ipsum dolor sit amet, consectet
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton >
                        </div>
                    </div>
                    <TimeLineSection />
                    <LearningLanguageSection />
                </div>
            </div>
            {/* Section 3  */}
            <div>
                <div className=" w-11/12 flex flex-col mx-auto max-w-maxContent items-center justify-between gap-8 text-white">
                    <InstructorSection />
                    <h2 className="text-4xl font-semibold mt-10 text-center">Review from other learners</h2>
                    {/* Review Slider */}
                </div>
            </div >
            {/* Footer 4  */}
            <Footer />
        </>
    )
}

export default Home