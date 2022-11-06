import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin, getAllUsers, getUserDetails, getAllServices, createService, updateProfile, updatePassword } from './userAction';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const userInfo = localStorage.getItem('userInfo')



const initialState = {
    loading: false,
    userInfo: JSON.parse(userInfo),
    userToken, // for storing the JWT
    error: null,
    success: false,  // for monitoring the registration process.
    users: [],
    services: []
}

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken')
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        }
    },
    extraReducers: {

        // login user reducer
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload.user
            state.userToken = payload.token
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },

        // User Profile
        [getUserDetails.pending]: (state) => {
            state.loading = true
        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
        },
        [getUserDetails.rejected]: (state, { payload }) => {
            state.loading = false
        },

        // All Users
        [getAllUsers.pending]: (state) => {
            state.loading = true
        },
        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.users = payload
        },
        [getAllUsers.rejected]: (state, { payload }) => {
            state.loading = false
        },

        // User Profile update
        [updateProfile.pending]: (state) => {
            state.loading = true
        },
        [updateProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.success = true
        },
        [updateProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // Change Password
        [updatePassword.pending]: (state) => {
            state.loading = true
        },
        [updatePassword.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.success = true
        },
        [updatePassword.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // All Services
        [getAllServices.pending]: (state) => {
            state.loading = true
        },
        [getAllServices.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.services = payload
        },
        [getAllServices.rejected]: (state, { payload }) => {
            state.loading = false
        },


        // create service
        [createService.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [createService.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [createService.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },
    }
});

export const { logout } = usersSlice.actions
export default usersSlice.reducer