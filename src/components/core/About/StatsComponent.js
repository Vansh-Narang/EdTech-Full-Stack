import React from 'react'

function StatsComponent() {
    const Stats = [
        {
            count: "5k",
            label: "Active Students"
        },
        {
            count: "10k+",
            label: "Mentors"
        },
        {
            count: "200+",
            label: "Courses"
        },
        {
            count: "50+",
            label: "Awards"
        }

    ];
    return (
        <section className='text-white'>
            <div className=''>
                <div className='flex gap-x-5'>
                    {
                        Stats.map((element, index) => {
                            return (
                                <div key={index}>
                                    <h1>{element.count}</h1>
                                    <p>{element.label}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent