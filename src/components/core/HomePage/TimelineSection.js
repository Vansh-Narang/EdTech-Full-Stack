import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"


const timeLine = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully comitted to the sucess of company"
    },
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully comitted to the sucess of company"
    },
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully comitted to the sucess of company"
    },
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully comitted to the sucess of company"
    }
]



function TimelineSection() {
    return (
        <div>
            <div className='flex flex-row gap-15 items-center'>
                <div className='w-[45%] flex flex-col gap-5'>
                    {
                        timeLine.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-6 ' key={index}>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                        <img src={element.Logo} />
                                    </div>
                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default TimelineSection