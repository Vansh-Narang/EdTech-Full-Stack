//script ko load
//option object create (to open modal)
//payment sucessfully email send
import { studentEndpoints } from "../apis"
import { toast } from 'react-hot-toast'
import rzpLogo from "../../assets/asset 0.png"
import { apiConnector } from "../apiconnector"
import { setPaymentLoading } from "../../slices/CourseSlice";
import { resetCart } from "../../slices/cartSlice";


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
            return;
        }
        //initate the order using caprture payment
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courses },
            {
                Authorisation: `Bearer ${token}`,
            })

        console.log("orderResponse", orderResponse)
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }
        console.log(orderResponse)

        const options = {
            key: "rzp_test_tMsmRLf1r4WegT",
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "StudyHub",
            description: "Thank You for Purchasing the Course",
            // image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                if (response.error) {
                    console.error("Razorpay payment failed:", response.error);
                    toast.error("Razorpay payment failed: " + response.error.description);
                }
                //send successful wala mail
                sendPaymentSucessEmail(response, orderResponse.data.message.amount, token);
                //verifyPayment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            console.log(response.error);
            toast.error("oops, payment failed");

        })

    } catch (error) {
        console.log("Payement api error", error)
        toast.error(error)
    }
    toast.dismiss(toastId)

}

async function sendPaymentSucessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, {
            Authorisation: `Bearer ${token}`,
        })
    } catch (error) {
        console.log("Payment Success email error", error)
    }
}


//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...")
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorisation: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Payment successful, added to the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("payment verification error", error)
        toast.error("payment verification error")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}