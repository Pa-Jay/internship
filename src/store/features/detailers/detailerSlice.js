import { createSlice } from '@reduxjs/toolkit';
import { becomeADetailer, getAllDetailers, getDetailerDetails, updateDetailerProfile } from './detailerAction';


const detailerInfo = localStorage.getItem('detailerInfo')



const initialState = {
    loading: false,
    detailerProfile: JSON.parse(detailerInfo),
    error: null,
    success: false,  // for monitoring the registration process.
    detailers: []
}

const detailerSlice = createSlice({
    name: 'detailer',
    initialState,
    reducers: {
    },
    extraReducers: {

        // detailer Profile
        [getDetailerDetails.pending]: (state) => {
            state.loading = true
        },
        [getDetailerDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.detailerProfile = payload
        },
        [getDetailerDetails.rejected]: (state, { payload }) => {
            state.loading = false
        },

        // All Users
        [getAllDetailers.pending]: (state) => {
            state.loading = true
        },
        [getAllDetailers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.detailers = payload
        },
        [getAllDetailers.rejected]: (state, { payload }) => {
            state.loading = false
        },

        // User Profile update
        [updateDetailerProfile.pending]: (state) => {
            state.loading = true
        },
        [updateDetailerProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
        },
        [updateDetailerProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // Become Detailer
        [becomeADetailer.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [becomeADetailer.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [becomeADetailer.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },
    }
});

export default detailerSlice.reducer