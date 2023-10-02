import React from 'react'
import { Link, NavLink, matchPath } from "react-router-dom"
import Logo from "../../assets/asset 0.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from "../core/Auth/ProfileDropDown"
function Navbar() {

    //fetch all the state from the reducer to see whether the user is logged in or not
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);



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
                                            element.title === "Catalog" ? (
                                                <div>

                                                </div>
                                            ) : (
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
                    {
                        //cart the data (if user is present)
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative' >
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>
            </div>

        </div >
    )
}

export default Navbar