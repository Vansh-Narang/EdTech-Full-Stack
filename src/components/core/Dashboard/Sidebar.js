import React, { useState } from 'react'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { sidebarLinks } from "../../../data/dashboard-links"
import { Logout, logout } from "../../../services/Operations/authApi"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from "../../Common/ConfirmationModal"
function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)

    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading ...
            </div>
        )
    }
    return (
        <div className=''>
            <div className='flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((element) => {
                            if (element.type && user?.accountType !== element.type) {
                                return null;
                            }
                            return (
                                <SidebarLink link={element} iconName={element.icon} key={element.id} />
                            )
                        }
                        )
                    }
                </div>
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
                <div className='flex flex-col'>
                    <SidebarLink
                        link={{ name: "Settings", path: "dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />
                    <button
                        onClick={() => setConfirmationModal({
                            text1: "Are you sure ?",
                            text2: "You will be logged out ",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null)
                        })}
                        className='text-sm font-medium text-richblack-300'
                    >
                        <div className='flex flex-row items-center gap-x-2'>
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {/* visble or invisble confirmation modal */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div >
    )
}

export default Sidebar