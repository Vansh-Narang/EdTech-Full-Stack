import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import Home from '../../../Pages/Home'
import HighlightText from './HighlightText'

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"]

function ExploreMore() {

    const [currentTab, setCurretTab] = useState(tabsName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        //Function setMyCards is used to update the cards state
        setCurretTab(value);
        //current tab me jo value aayegi
        //uske hisab se filter kr do
        const result = HomePageExplore.filter((course) => course.tag === value)
        //filter ke baad update the all courses (3 cards)
        setCourses(result[0].courses)
        //from the 3 cards current card to be displayed in the white color
        setCurentCard(result[0].courses[0].heading)
    }
    return (
        <div>
            <div className='text-4xl font-semibold text-center'>
                Unlock the
                <HighlightText text={"Power of Code"} />
            </div>
            <p className='text-center text-richblack-300 text-sm mt-3 px-1 py-1'>
                Learn to build anything you can imagine
            </p>
            <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div className={`text-[16px] flex flex-row items-center gap-2
                            ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"}
                             rounded-full transition-all 
                             duration-200 cursor-pointer hover:bg-richblack-900
                              hover:text-richblack-5 px-7 py-2 `} key={index} onClick={() => setMyCards(element)}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>
            <div className='lg:h-[150px]'></div>
            <div className="absolute flex flex-row gap-10 justify-between w-full">
                {/* //course card ka group */}
                {
                    courses.map((element, index) => {
                        return (
                            <div key={index} className={`translate-y-[-50%] translate-x-[-70%] ${index === 0 ? "  bg-white text-richblack-900" : " bg-richblack-800"} text-white h-[80%] w-[80%] px-7 py-7 `}>
                                <div className='font-semibold mb-5 text-xl'>
                                    {element.heading}
                                </div>
                                <p className='text-richblack-400'>{element.description}</p>
                                <div className='flex flex-row text-richblack-900 justify-between mt-20'>
                                    <p className='text-blue-100'>{element.level}</p>
                                    <p className='text-blue-100'>{element.lessionNumber} Lession</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default ExploreMore