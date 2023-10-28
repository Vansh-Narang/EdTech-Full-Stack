//script ko load
//option object create (to open modal)
//payment sucessfully email send
import { studentEndpoints } from "../apis"
import { toast } from 'react-hot-toast'
import rzpLogo from "../../assets/asset 0.png"



const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
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

// async function sendPaymentSucessEmail(response,)
