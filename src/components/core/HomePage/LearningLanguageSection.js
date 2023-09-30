import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
// import banner from "../../../assets/asset 5.png"
import Knowyourprogress from "../../../assets/asset 6.png"
import Knowyourprogress1 from "../../../assets/asset 7.svg"
import Knowyourprogress2 from "../../../assets/asset 8.svg"

function LearningLanguageSection() {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl font-bold text-center'>
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        <div className='max-w-maxContent flex '>
          <p className='text-black font-medium text-center mx-auto mt-3 w-[70%]'>Using spin learning multiple language easy with 20+ language realistic voice-over progress tracking
            custom scedule and more lorem-specific language features lorem-specific
          </p>
        </div>
        <div className='flex flex-row items-center mt-5'>
          <img src={Knowyourprogress} alt="Know your progress" className='w-[500px] object-contain -mr-32' />
          <img src={Knowyourprogress1} alt="Know your progress" className='w-[500px] object-contain' />
          <img src={Knowyourprogress2} alt="Know your progress" className='w-[500px] object-contain -ml-36' />
        </div>
        <div className='w-fit '>
          <CTAButton active={true} linkto={"/signup"} >
            <div>
              Learn More
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection