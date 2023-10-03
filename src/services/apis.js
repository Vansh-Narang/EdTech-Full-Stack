const BASE_URL = 'http://localhost:4000/api/v1';
// console.log("Base URL: " + BASE_URL);

export const categories = {
    CATEGORIES_API: BASE_URL + '/course/showAllCategories',
}
console.log("Categories: " + categories.CATEGORIES_API)


export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}