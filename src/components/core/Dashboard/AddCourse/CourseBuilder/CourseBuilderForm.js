import React from 'react'
import { useForm } from "react-hook-form"
const CourseBuilderForm = () => {


    const { register, handleSubmit, setValue, formState: { errors }
    } = useForm()

    return (
        <div className='text-white'>
            <p>Course Builder</p>
            <form>
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
            </form>
        </div>
    )
}

export default CourseBuilderForm
