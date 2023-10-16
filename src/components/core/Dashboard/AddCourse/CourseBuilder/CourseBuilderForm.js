import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import IconButton from "../../../../Common/IconButton"
import { BiAddToQueue } from "react-icons/bi"
import { BiRightArrow } from "react-icons/bi"
import { toast } from "react-hot-toast"
import { NestedView } from "../CourseBuilder/NestedView"
const CourseBuilderForm = () => {


    const { register, handleSubmit, setValue, formState: { errors }
    } = useForm()
    const [editSectionName, setSectionName] = useState(null)
    const { course } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        let result;

        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )
        }
        else {
            result = await createSection({
                //data means jo form se data aa rha hai
                //and section name jo model me hai
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
        }

        //update values
        if (result) {
            dispatch(setCourse(result))
            setSectionName(null)
            setValue("sectionName", "")
        }
        //loading (false)
        setLoading(false)
    }



    const goBack = () => {
        //when returning to the previous page then you can edit as you have already created the course
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }
    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one section")
            return;
        }
        //when moving to the next page then use the dispatch function with setStep(3) 
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one subsection ")
            return;
        }
        //if everything is ok
        dispatch(setStep(3))
    }
    const cancelEdit = () => {
        setSectionName(null)
        setValue("sectionName", " ")
    }
    const handleChangedEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit()
            return;
        }
        setSectionName(sectionId)
        setValue("sectionName", sectionName)
    }
    return (
        <div className='text-white'>
            <p>Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Section Name <sup>*</sup></label>
                    <input type=""
                        id="sectionName"
                        placeholder='Add a section'
                        {...register("sectionName", { required: true })}
                        className='w-full'
                    />
                    {
                        errors.sectionName && (
                            <span>Section Name is required</span>
                        )
                    }
                </div>
                <div className='mt-10 flex '>
                    <IconButton
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                        type="submit"
                        customClasses={"text-white"}
                    >
                        <BiAddToQueue className='text-yellow-50' />
                    </IconButton>
                    {
                        editSectionName && (
                            <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline ml-10'>
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>

            {/* Nested view */}
            {
                // There is a course content length in the model of course which shows the section length 
                course.courseContent.length > 0 && (
                    <NestedView handleChangedEditSectionName={handleChangedEditSectionName} />
                )
            }
            <div className='flex justify-end gap-x-3'>
                <button onClick={goBack} className='rounded-md curson-pointer flex items-center'>
                    Back
                </button>
                <IconButton text="Next" onclick={goToNext}>
                    <BiRightArrow />                </IconButton>
            </div>
        </div>
    )
}

export default CourseBuilderForm
