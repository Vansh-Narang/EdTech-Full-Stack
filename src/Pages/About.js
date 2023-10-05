import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText"
import Banner from "../assets/banner.jpg"
import Quote from "../components/core/About/Quote"
import FoundingStory from "../assets/asset 9.png"
import StatsComponent from '../components/core/About/StatsComponent'
function About() {
    return (
        <div className='text-white mt-[100px]'>
            {/* section 1 */}
            <section>
                <div>
                    <header className="">Driving Innovation in Online Education for a <HighlightText text={"Brighter future"} />
                        <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </header>
                    <div className='flex flex-row gap-x-3 mx-auto'>
                        <img className="w-[600px] h-[400px]" src={Banner}></img>
                        <img className="w-[600px] h-[400px]" src={Banner}></img>
                        <img className="w-[600px] h-[400px]" src={Banner}></img>
                    </div>
                </div>
            </section >

            {/* section 2 */}
            <section>
                <div>
                    <Quote />
                </div>
            </section>

            {/* section 3 */}
            <section className='flex flex-col'>
                {/* founding story div */}
                <div className='flex'>
                    <div>
                        {/* founding story left box */}
                        <div>
                            <h1>Our Founding Storing</h1>
                            <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                    </div>
                    {/* founding story right box */}
                    <div >
                        <img className="" src={FoundingStory} />
                    </div>
                </div>

                {/* vision and mission wala parent div */}
                <div className='flex'>
                    {/* left wala box */}
                    <div>
                        <h1>Our Vision</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    {/* right wala box */}
                    <div>
                        <h1>Our Mission</h1>
                        <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <StatsComponent />


        </div >
    )
}

export default About