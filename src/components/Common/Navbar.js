import React, { useState, useEffect } from 'react'
import { Link, NavLink, matchPath } from "react-router-dom"
import Logo from "../../assets/asset 0.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai"
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from "react-icons/io"
function Navbar() {

    //fetch all the state from the reducer to see whether the user is logged in or not
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    //use Effect make api call
    const [subLinks, setSubLinks] = useState([])
    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            console.log("printing result", result.data.data)
            setSubLinks(result.data.data)
        } catch (error) {
            console.log("Couldnot fetch category", error.message)
        }
    }
    useEffect(() => {
        fetchSublinks();
    }, [])

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
                                                <div className='relative flex items-center gap-2 group'>
                                                    <p>{element.title}</p>
                                                    <IoIosArrowDropdownCircle />

                                                    <div className='invisible absolute translate-x-[-50%] translate-y-[20%]  left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                                        <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[90%] translate-y-[-20%]'>
                                                        </div>
                                                        {
                                                            subLinks.length ? (
                                                                subLinks.map((subLink, index) => (
                                                                    <Link to={subLink.path} key={index}>
                                                                        <p>{subLink.name}</p>
                                                                    </Link>
                                                                )
                                                                )
                                                            ) : (<div></div>)
                                                        }
                                                    </div>
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
                <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </div>

        </div >
    )
}

export default Navbar