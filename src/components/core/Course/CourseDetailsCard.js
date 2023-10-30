import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { addToCart } from '../../../slices/cartSlice';
function CourseDetailsCard({ course, setConfrimationModal, handleBuyCourse }) {

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()


    function handleAddToCart() {
        //looged out and instructor cannot add to cart
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor")
            return;
        }
        if (token) {
            dispatch(addToCart(course))
            return;
        }
        setConfrimationModal({
            text1: "You are not logged in",
            text2: "Please login",
            btn1text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfrimationModal(null)
        });
    }
    function handleShare() {
        copy(window.localStorage.href);
        toast.success("Link copied to clipboard")
    }
    return (
        <div className='flex flex-col gap-y-6'>
            <img src={ThumbnailImage} alt='thumbnailImage'
                className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl' />
            <div>
                Rs. {CurrentPrice}
            </div>
            <div>
                <button className='bg-yellow-50 w-fit text-black' onClick={user && course?.studentsEnrolled.includes(user?.id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse()}>
                    {
                        //if user logged in and course details student enrolled in same or not
                        user && course?.studentsEnrolled.includes(user?.id) ? "Go to course" : "Buy Now"
                    }
                </button>

                {
                    //add to cart then add to cart
                    (!course?.studentsEnrolled.includes(user?.id) && (
                        <button onClick={handleAddToCart} className='bg-yellow-50 w-fit text-black'>
                            Add to Cart
                        </button>
                    ))
                }
            </div>
            <div>
                <p>30 Day money back gurantee</p>
                <p>
                    This Course includes
                </p>
                <div className='flex flex-col gap-y-3'>
                    {
                        course?.instructions.map((item, index) => {
                            <p key={index} className='flex gap-2'>
                                <span>
                                    instructionns aayenge ya
                                    {/* {item} */}
                                </span>
                            </p>
                        })
                    }
                </div>
            </div>
            <div>
                <button onClick={handleShare} className='items-center text-yellow-50 m-auto'>
                    Share
                </button>
            </div>
        </div>
    )
}
export default CourseDetailsCard 