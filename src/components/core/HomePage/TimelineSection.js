import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
// import Logo2 from "../../../assets/TimeLineLogo/Logo1.svg"
// import Logo3 from "../../../assets/TimeLineLogo/Logo1.svg"
// import Logo4 from "../../../assets/TimeLineLogo/Logo1.svg"
import Banner from "../../../assets/banner.jpg"

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully commited to the success company"
    },
    {
        Logo: Logo1,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: Logo1,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    },
    {
        Logo: Logo1,
        Heading: "Solve the Problem",
        Description: "Code your way to a solution"
    },
]
const TimeLineSection = () => {
    return (
        <div>
            <div className='flex flex-row items-center gap-15'>

                <div className='w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex gap-5' key={index}>

                                    <div className='w-[50px] h-[50px] bg-white items-center flex'>
                                        <img src={element.Logo} />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div>
                    <img src={Banner} alt='timelineImage' className='h-fit shadow-lg shadow-pure-greys-400 object-cover w-[1000px]' />
                    <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-10%] translate-y-[-50%]'>
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm'>10 Years of Experience</p>
                        </div>
                        <div className='flex gap-5 items-center px-7'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm>Types of courses'>Learning Courses</p>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default TimeLineSection