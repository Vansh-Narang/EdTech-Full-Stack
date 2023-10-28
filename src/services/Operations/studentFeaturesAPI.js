//script ko load
//option object create (to open modal)
//payment sucessfully email send
import { studentEndpoints } from "../apis"
import { toast } from 'react-hot-toast'
import rzpLogo from "../../assets/asset 0.png"



const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    //load script in runtime
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src;

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("loading....")
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        //script taken from documentation

        if (!res) {
            toast.error('Failed to load sdk razorpay')
        }

        //initate the order using caprture payment
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
            Authorization: `Bearer ${token}`
        })

        if (orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "Study Notion",
            description: "Thank You for Purchasing",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: `${userDetails.email}`
            },
            handler: function (response) {
                //successful wala email
                sendPaymentSucessEmail(response, orderResponse.data.data.amount, token)
                //verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)

            }
        }

    } catch (error) {
        console.log("Payement api error", error)
        toast.error(error)
    }
    toast.dismiss(toastId)

}

async function sendPaymentSucessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            order_id: response.razorpay_order_id,

        }), {
            Authorization: `Bearer ${token}`,
        }
    } catch (error) {
        console.log("Payment Success email error", error)
    }
}


//verify payment
async function verifyPayment(body, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...")
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Payment successful, added to the course")
        navigate("/dasboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("payment verification error", error)
        toast.error("payment verification error")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}