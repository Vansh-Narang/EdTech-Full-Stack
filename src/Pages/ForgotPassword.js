import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPasswordResetToken } from "../services/Operations/authApi"
const ForgotPassword = () => {

    const dispatch = useDispatch()

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const loading = useSelector((state) => state.auth)
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
    return (
        //loading field in slices is used to see whether the loader has to be shown or not
        <div className='text-white text-center'>
            {
                false ? (
                    <div className=''>Loading</div>
                ) : (
                    <div>
                        <h1>
                            {
                                !emailSent ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>
                        <p>
                            {
                                !emailSent ? "Have no fear , We will email you how to reset your password" : ` Please check your email ${email}`
                            }
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    < label >
                                        <p>Email Address </p>
                                        <input type="email" required name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address'></input>
                                    </label>
                                )
                            }
                            <button type="submit">
                                {
                                    !emailSent ? "Reset password" : "Resend email"
                                }
                            </button>
                        </form>
                        <div>
                            <Link to="/login">
                                <p>Back to login </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default ForgotPassword
