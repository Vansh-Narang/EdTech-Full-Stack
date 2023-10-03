import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //local storage se get kro value


    //When we login the 
    //application for the first time
    // we will get the token we will store it
    // in local storage then in that local storage 
    //we have the access token if we leave the application 
    //the local storage will have our access token
    // for accessing in the future

    //if get the token from local storage then parse else set it to null
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
    },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;