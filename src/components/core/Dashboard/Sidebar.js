import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { sidebarLinks } from "../../../data/dashboard-links"
import { Logout } from "../../../services/Operations/authApi"
import { useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { VscSettingsGear } from 'react-icons/vsc'
function Sidebar() {
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
                </div>
            </div>
        </div>
    )
}

export default Sidebar