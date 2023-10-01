import React from 'react'
import { Link, NavLink, matchPath } from "react-router-dom"
import Logo from "../../assets/asset 0.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation()
    const matchRoute = (route) => {
        //match the path of url with the path coming from the navnbar links array
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to="/">
                    <img src={Logo} width={160} height={42} loading='lazy' />
                </Link>

                {/* Navlinks */}
                <nav>
                    <ul className='flex flex-row gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((element, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            element.title === "Catalog" ? (<div></div>) : (
                                                <Link to={element?.path}>
                                                    <p className={`${matchRoute(element?.path) ? "text-yellow-25" : "text-richblack-100"}`}>
                                                        {element.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                {/* Login /signup */}
                <div className='flex gap-x-4 items-center'>
                    
                </div>
            </div>

        </div >
    )
}

export default Navbar