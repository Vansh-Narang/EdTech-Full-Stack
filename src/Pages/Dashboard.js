import React from 'react'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import SideBar from '../components/core/Dashboard/Sidebar';
function Dashboard() {

    const { loading: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (profileLoading || authLoading) {
        return (
            < div className='text-white mt-20'>
                Loading
            </div >
        )
    }
    return (
        <div className='relatice flex min-h-[calc(100vh-3.5rem)]'>
            <SideBar />
            <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Dashboard