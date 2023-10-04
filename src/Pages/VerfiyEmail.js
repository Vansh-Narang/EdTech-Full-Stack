import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from "react-otp-input"
import { sendOtp, signUp } from '../services/Operations/authApi'
import { Link, useNavigate } from 'react-router-dom'
const VerfiyEmail = () => {
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, signupData } = useSelector((state) => state.auth)
    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [])
    return (
        <div className='text-white'>
            {
                loading ? (<div>Loading ...</div>) : (
                    <div>
                        <h1>Verfiy Email</h1>
                        <p>A verification code has been sent to your email. Enter the code</p>
                        <form onSubmit={handleSubmit}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => <input className=' bg-richblack-800'{...props} />}
                                renderSeparator={<span>-</span>}
                                className="w-full p-6 bg-richblack-600 text-richblack-300"
                            />
                            <button type='submit'>
                                Verfiy Email
                            </button>
                        </form>
                        <div>
                            <Link to="/login">
                                Back to Login
                            </Link>
                        </div>
                        <button onClick={() => dispatch(sendOtp(signupData.email))}>
                            Resend it
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default VerfiyEmail
