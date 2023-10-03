import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const loading = useSelector((state) => state.auth)
    return (
        //loading field in slices is used to see whether the loader has to be shown or not
        <div>
            {
                loading ? (
                    <div>Loading</div>
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
                        <form>
                            {
                                !emailSent && (
                                    < label >
                                        <p>Email Address </p>
                                        <input type="email" required name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address'></input>
                                    </label>
                                )
                            }
                            <button>
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
