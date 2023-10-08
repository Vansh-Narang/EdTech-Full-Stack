import React from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import IconButton from '../../Common/IconButton'
const MyProfile = () => {

    const { user } = useSelector((state) => state.profile)
    // console.log(user)
    const navigate = useNavigate()
    return (
        <div className='text-white'>
            <h1>
                My Profile
            </h1>

            {/* //section 1 */}
            <div>
                <div>
                    <img src={user?.img} alt={`profile-${user?.firstName}`} className='aspect-sqaure w-[78px] rounded-full object-cover' />
                    <div>
                        <p>{user?.firstName + "" + user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <IconButton
                    text="Edit"
                    onclick={() => navigate("/dashboard/settings")}
                />
            </div>
        </div>
    )
}

export default MyProfile
