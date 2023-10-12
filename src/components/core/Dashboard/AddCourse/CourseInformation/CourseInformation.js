import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { HiCurrencyDollar } from "react-icons/hi2"
import RequirementField from './RequirementField';
import IconButton from '../../../../Common/IconButton';
import { setCourse, setStep } from "../../../../../slices/CourseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"

import {
    addCourseDetails,
    editCourseDetails,
    fetchCourseCategories,
} from "../../../../../services/Operations/CourseDetails"
function CourseInformation() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
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
            setValue("courseTitle", course.courseName)
            setValue("courseDescription", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseCategory", course.category)
            setValue("courseRequirments", course.instructions)
            // setValue("CourseImage", course.thumbnail)
        }
        getCategories();
    }, [])
    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            // currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString()
            // currentValues.courseImage !== course.thumbnail
        ) {
            return true
        }
        return false
    }

    const onSubmit = async (data) => {
        //on clicking on next button
        if (editCourse) {
            // const currentValues = getValues()
            // console.log("changes after editing form values:", currentValues)
            // console.log("now course:", course)
            // console.log("Has Form Changed:", isFormUpdated())
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                // console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                // if (currentValues.courseTags.toString() !== course.tag.toString()) {
                //     formData.append("tag", JSON.stringify(data.courseTags))
                // }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                // if (
                //     currentValues.courseRequirements.toString() !==
                //     course.instructions.toString()
                // ) {
                //     formData.append(
                //         "instructions",
                //         JSON.stringify(data.courseRequirements)
                //     )
                // }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }
                // console.log("Edit Form data: ", formData)
                setloading(true)
                const result = await editCourseDetails(formData, token)
                setloading(false)
                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        setloading(true)
        const result = await addCourseDetails(formData, token)
        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setloading(false)
    }

    return (
        <form
            className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='text-richblack-300'>
                <label>Course Title<sup>*</sup></label>
                <input id="courseTitle" placeholder='Enter Course Title' {...register("courseTitle", { required: true })}
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
                <textarea id="courseDescription" placeholder='Enter Course Description' {...register("courseDescription", { required: true })}
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
                <textarea id="coursePrice" placeholder='Enter Course Price' {...register("coursePrice", {
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

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                    Course Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                    {...register("courseCategory", { required: true })}
                    defaultValue=""
                    id="courseCategory"
                    className="form-style w-full"
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {!loading &&
                        courseCategories?.map((category, indx) => (
                            <option key={indx} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
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
            <div>
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            className='flex items-center gap-x-2 bg-richblack-300'
                        >
                            Continue without saving
                        </button>
                    )
                }
                <IconButton
                    text={!editCourse ? "Next" : "Save Changes"}
                />
            </div>
        </form >
    )
}

export default CourseInformation