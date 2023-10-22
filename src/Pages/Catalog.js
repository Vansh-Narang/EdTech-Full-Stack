import React, { useState, useEffect } from 'react'
import Footer from "../components/Common/Footer"
import { useParams } from 'react-router-dom'
import { apiConnector } from "../services/apiconnector"
import { catalogData, categories } from '../services/apis'
import { getCatalogaPageData } from "../services/Operations/pageandComponent"
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Course_Card from '../components/core/Catalog/Course_Card';
const Catalog = () => {



    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")


    //fetch all categories
    const getCategories = async () => {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id =
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        setCategoryId(category_id);
    }

    useEffect(() => {
        getCategories();
        //jb bhi catalog name ki value change hue jaise jb new link pr click hue to link change hoyega
    }, [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogaPageData(categoryId)
                console.log("printing catalog page data", res)
                setCatalogPageData(res);
            } catch (error) {
                console.log(error)
            }
        }

        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])




    return (
        <>
            <div className='text-white  box-content bg-richblack-800 px-4'>
                {/* section 1 */}
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                    <p className='text-richblack-100 tracking-wide'>{`Home / Catalog / `}
                        <span className='text-yellow-50'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className='text-3xl tracking-wider'>
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    <p className='tracking-wide text-richblack-100'>
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Courses to bought */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent text-white'>
                <div>
                    <div className='font-bold text-4xl my-2'>
                        Courses to get you started
                    </div>
                    <div className='flex gap-x-3'>
                        <p
                            className={`px-4 py-2 ${active === 1
                                    ? "border-b border-b-yellow-25 text-yellow-25"
                                    : "text-richblack-50"
                                } cursor-pointer`}
                            onClick={() => setActive(1)}
                        >
                            Most Popular
                        </p>
                        <p
                            className={`px-4 py-2 ${active === 2
                                    ? "border-b border-b-yellow-25 text-yellow-25"
                                    : "text-richblack-50"
                                } cursor-pointer`}
                            onClick={() => setActive(2)}
                        >
                            New
                        </p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                    </div>
                </div>

                {/* section 2 */}
                <div className='text-white my-24'>
                    <p className='font-bold text-4xl tracking-normal'>Top Courses in {catalogPageData?.data?.differentCategory?.name}</p>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                    </div>
                </div>
                {/* 3rd section */}
                <div className='text-white'>
                    <div className='font-bold text-4xl'>Frequently bought together</div>
                    <div className='py-8 '>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            {/* {
                                    catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                        <Course_Card course={course} key={index} Height={"h-[400px]"} />
                                    ))
                                } */}
                            {
                                catalogPageData?.data?.selectedCategory?.courses.slice(0, 4).map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[400px]"} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Catalog
