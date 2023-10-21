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
            <div className='text-white'>
                {/* section 1 */}
                <div>
                    <p>{`Home / Catalog /`}
                        <span>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p>
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    <p>
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>

                {/* Courses to bought */}
                <div>
                    <div>
                        <div>
                            Courses to get you started
                        </div>
                        <div className='flex gap-x-3'>
                            <p>Most Popular</p>
                            <p>New</p>
                        </div>
                        <div>
                            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className='text-white'>
                        <p>Top Courses in {catalogPageData?.data?.differentCategory?.name}</p>
                        <div>
                            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                        </div>
                    </div>
                    {/* 3rd section */}
                    <div>
                        <div>Frequently bought together</div>
                        <div className='py-8 '>
                            <div className='grid grid-cols-1 lg:grid-cols-2'>
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
            </div>
        </>
    )
}

export default Catalog
