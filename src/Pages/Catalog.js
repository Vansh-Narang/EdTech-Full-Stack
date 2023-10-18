import React, { useState, useEffect } from 'react'
import Footer from "../components/Common/Footer"
import { useParams } from 'react-router-dom'
import { apiConnector } from "../services/apiconnector"
import { categories } from '../services/apis'
import { getCatalogaPageData } from "../services/Operations/pageandComponent"
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
                console.log("printing res", res?.data?.data)
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
                    {/* <p>{`Home / Catalog /`}</p> */}
                    <p></p>
                    <p></p>
                </div>

                {/* Courses to bought */}
                <div>
                    <div>
                        <div className='flex gap-x-3'>
                            <p>Most Popular</p>
                            <p>New</p>
                        </div>
                        {/* <CourseSlider /> */}
                    </div>

                    {/* section 2 */}
                    <div>
                        <p>Top Courses</p>
                        <div>
                            {/* <Slider /> */}
                        </div>
                    </div>
                    {/* 3rd section */}
                    <div>
                        <p>Frequently bought together</p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Catalog
