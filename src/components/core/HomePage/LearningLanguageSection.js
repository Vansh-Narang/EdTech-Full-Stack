import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import banner from "../../../assets/banner.jpg"
function LearningLanguageSection() {
  return (
    <div className='mt-[130px]'>
      <div className='flex flex-col gap-5'>
        <div className='text-4xl font-bold text-center'>
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        <div className='max-w-maxContent flex '>
          <p className='text-black font-medium text-center mx-auto mt-3 w-[70%]'>Using spin learning multiple language easy with 20+ language realistic voice-over progress tracking
            custom scedule and more lorem-specific language features lorem-specific
          </p>
        </div>
        <div className='flex flex-row items-center mt-5'>
          <img src={banner} alt="Know your progress" className='w-[500px] object-contain' />
          <img src={banner} alt="Know your progress" className='w-[500px] object-contain' />
          <img src={banner} alt="Know your progress" className='w-[500px] object-contain' />
        </div>
        <div className='w-[100px] flex items-center'>
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