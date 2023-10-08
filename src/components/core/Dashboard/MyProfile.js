import React from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import IconButton from '../../Common/IconButton'
const MyProfile = () => {

    const { user } = useSelector((state) => state.profile)
    // console.log(user)
    const navigate = useNavigate()
    return (
        <div className='text-white ml-32 max-w-maxContent w-[100vw]'>
            <h1 className='text-4xl'>
                My Profile
            </h1>

            {/* //section 1 */}
            <div className='flex flex-row  bg-richblack-700'>
                <div>
                    <img src={user?.img} alt={`profile-${user?.firstName}`} className='aspect-sqaure w-[78px] rounded-full object-cover' />
                    <div className='flex flex-col'>
                        <p>{user?.firstName + "" + user?.lastName}</p>
                        <p>{"Email"}</p>
                    </div>
                </div>
                <IconButton
                    className="text-black bg-yellow-600"
                    text="Edit"
                    onclick={() => navigate("/dashboard/settings")}
                />
            </div>


            {/* section 2 */}
            <div>
                <div>
                    <p>About </p>
                    <IconButton
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}

                    />
                </div>
                <p>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
            </div>

            {/* section 3 */}
            <div>
                <div>
                    <p>Personal Details</p>
                    <IconButton
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    />
                </div>
                <div>
                    <div>
                        <p>FirstName</p>
                        <p>{user?.firstName}</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>{user?.lastName}</p>
                    </div>
                    <div>
                        <p>Gender</p>
                        <p>{user?.additionalDetails?.gender ?? "Enter the gender details"}</p>
                    </div>
                    <div>
                        <p>LastName</p>
                        <p>{user?.lastName ?? "Add last name"}</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <p>{user?.additionalDetails?.contactNumber ?? "Add contact number"}</p>
                    </div>
                    <div>
                        <p>Date of Birth</p>
                        <p>{user?.additionalDetails?.dateofBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyProfile
