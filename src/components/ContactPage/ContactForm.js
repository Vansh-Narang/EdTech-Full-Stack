import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
function ContactForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSucessful }
    } = useForm()

    const submitContactForm = async (data) => {

    }

    useEffect(() => {
        if (isSubmitSucessful) {
            reset({
                email: "",
                firstname: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [isSubmitSucessful, reset]);
    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input type="text" name="firstname" id="firstname" placeholder='Enter first Name' {...register("firstname", { required: true })}></input>
                    {
                        errors.firstname && (
                            <span>
                                Please enter first name
                            </span>
                        )
                    }
                </div>

                {/* last name */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname'>First Name</label>
                    <input type="text" name="lastname" id="lastname" placeholder='Enter Last Name' {...register("lastname", { required: true })}></input>
                    {
                        errors.lastName && (
                            <span>
                                Please enter last name
                            </span>
                        )
                    }
                </div>

                {/* email */}
                <div className='flex flex-col'>
                    <label htmlFor='email'>
                        Email Address
                    </label>
                    <input type="email" name="email" id="email" placeholder="Enter Email" {...register("email", { required: true })} />
                    {
                        errors.email && (
                            <span>
                                Please enter your email address
                            </span>
                        )
                    }
                </div>
            </div>
        </form >
    )
}

export default ContactForm