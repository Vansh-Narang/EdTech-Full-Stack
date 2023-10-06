import React, { useEffect, useState } from 'react'
// import apiConnector from "../../services/apiconnector"
import { useForm } from "react-hook-form"
import CountryCode from "../../data/countrycode.json"
function ContactForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSucessful }
    } = useForm()

    const submitContactForm = async (data) => {
        console.log("logging data", data)
        try {
            setLoading(true)
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
            const response = { status: "ok" }
            console.log("Logging response", response)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
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

        //handle submit : (Inbuilt function)This function will
        // receive the form
        // data if form validation is successful


        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col'>
                <div className='flex gap-5'>
                    {/* firstName */}
                    <div className='flex flex-col'>
                        <label htmlFor='firstname'>First Name</label>
                        <input className="text-black" type="text" name="firstname" id="firstname" placeholder='Enter first Name' {...register("firstname", { required: true })}></input>
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
                        <label htmlFor='lastname'>Last Name</label>
                        <input className="text-black" type="text" name="lastname" id="lastname" placeholder='Enter Last Name' {...register("lastname", { required: true })}></input>
                        {
                            errors.lastName && (
                                <span>
                                    Please enter last name
                                </span>
                            )
                        }
                    </div>
                </div>

                {/* email */}
                <div className='flex flex-col'>
                    <label htmlFor='email'>
                        Email Address
                    </label>
                    <input className="text-black" type="email" name="email" id="email" placeholder="Enter Email" {...register("email", { required: true })} />
                    {
                        errors.email && (
                            <span>
                                Please enter your email address
                            </span>
                        )
                    }
                </div>

                {/* Phone No */}
                <div className='flex flex-col gap-x-10'>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <div className='flex flex-row gap-5'>
                        {/* drop down */}
                        <div className='text-black flex flex-col  w-[80px]'>
                            <select name='dropdown' id='dropdown' {...register("countrycode", { required: true })}>
                                {
                                    CountryCode.map((element, index) => {
                                        return (
                                            <option value={element.code} key={index}>
                                                {element.code}-{element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex w-[calc(100%-90px)] flex-col '>
                            <input type='number'
                                name='phonenumber' id="phonenumber"
                                placeholder='1234-567-890'
                                className='text-black'
                                {...register("phoneNo", {
                                    required: { value: true, message: "Please enter a number" },
                                    maxLength: { value: 10, message: "Invalid Phone Number" },
                                    minLength: { value: 8, message: "Invalid Number" }
                                })} />
                        </div>
                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
                </div>

                {/* message */}
                <div className='flex flex-col'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        className="text-black"
                        name='message'
                        id='message'
                        cols="30"
                        rows="20"
                        placeholder='Enter your message'
                        {...register("message", { required: true })}
                    />
                    {
                        errors.message && (
                            <span>
                                Please enter your message.
                            </span>
                        )
                    }
                </div>

                {/* button */}
                <button type='submit'
                    className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black'>
                    Send message
                </button>


            </div>
        </form >
    )
}

export default ContactForm