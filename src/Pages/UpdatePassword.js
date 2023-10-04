import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/Operations/authApi'
import { useLocation } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link } from "react-router-dom"
function UpdatePassword() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { loading } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const { password, confirmPassword } = formData
    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password, confirmPassword, token))
    }

    return (
        <div className='text-white items-center text-center'>
            {
                loading ? (
                    <div>
                        Loading ...
                    </div>
                ) : (<div>
                    <h1>Choose new password</h1>
                    <p>Almost done enter your new password</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password *</p>
                            <input className="w-full p-6 bg-richblack-600 text-richblack-200" type={showPassword ? "text" : "password"} required name='password' onChange={handleOnChange} value={password} placeholder='Password' />
                            <span onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    !showPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />
                                }
                            </span>
                        </label>
                        <label>
                            <p>Confirm Password *</p>
                            <input className="w-full p-6 bg-richblack-600 text-richblack-200" type={showConfirmPassword ? "text" : "password"} required name='confirmPassword' onChange={handleOnChange} value={confirmPassword} placeholder='Confirm Password' />
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                {
                                    !showConfirmPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />
                                }
                            </span>
                        </label>
                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>
                    <div>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div >)
            }
        </div >
    )
}

export default UpdatePassword