import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseCategories } from "../../../../../services/Operations/CourseDetails"
import { HiCurrencyDollar } from "react-icons/hi2"
import RequirementField from './RequirementField'
function CourseInformation() {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()

    const dispatch = useDispatch()
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setloading] = useState(false)
    const [courseCategories, setcourseCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            setloading(false)
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setcourseCategories(categories)
            }
            console.log("Categories: " + categories)
            setloading(false)
        }
        if (editCourse) {
            setValue("CourseTitle", course.courseName)
            setValue("CourseDescription", course.courseDescription)
            setValue("CoursePrice", course.price)
            setValue("CourseTags", course.tag)
            setValue("courseCategory", course.category)
            setValue("courseRequirments", course.instructions)
            // setValue("CourseImage", course.thumbnail)
        }
        getCategories();
    }, [])

    const onSubmit = async () => {

    }

    return (
        <form
            className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='text-richblack-300'>
                <label>Course Title<sup>*</sup></label>
                <input id="CourseTitle" placeholder='Enter Course Title' {...register("courseTitle", { required: true })}
                    className='w-full '
                />
                {
                    errors.courseTitle && (
                        <span>Course Title is Required</span>
                    )
                }
            </div>

            <div>
                <label>Course Short Description<sup>*</sup></label>
                <textarea id="CourseDescription" placeholder='Enter Course Description' {...register("courseDescription", { required: true })}
                    className='min-h-[140px] w-full'
                />
                {
                    errors.courseDescription && (
                        <span>Course Description is Required</span>
                    )
                }

            </div>
            <div className='relative'>
                <label>Course Price<sup>*</sup></label>
                <textarea id="CoursePrice" placeholder='Enter Course Price' {...register("CoursePrice", {
                    required: true,
                    valueAsNumber: true,
                })}
                    className='w-full'
                />
                <HiCurrencyDollar className="absolute top-1/2 text-richblack-300" />
                {
                    errors.course && (
                        <span>Course Price</span>
                    )
                }

            </div>

            <div className='text-richblue-800'>
                <label>Course Category<sup>*</sup></label>
                <select
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory", { required: true })}
                >
                    <option value="" disabled>Choose a category</option>
                    {
                        !loading && courseCategories?.map((category, index) => {
                            <option key={index} value={category?.id}>
                                {category?.name}
                            </option>
                        })
                    }
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Category is required
                    </span>
                )}
            </div>

            {/* Create a custom component for handling tags input */}
            {/* <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setVaue={setValue}
                getValues={getValues}/>
                */}

            {/* create a componet for uploading and showing preview of media */}
            {/* <Upload name=
                label=
                register={register}
                errors={errors}
                setValue={setValue} /> */}

            {/* Benefits of the course      */}
            <div>
                <label>Benefits of the course<sup>*</sup></label>
                <textarea
                    id="coursebenfits"
                    placeholder='Enter benefits of the course'
                    {...register("coursebenfits", { required: true })}
                    className='min-h-[130px] w-full'
                />
                {errors.courseBenfits && (
                    <span>
                        Benefits of course required
                    </span>
                )}
            </div>

            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

        </form >
    )
}

export default CourseInformation