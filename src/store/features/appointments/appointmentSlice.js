import { createSlice } from '@reduxjs/toolkit';
import { bookAppointment, allAppointments, getAppointmentDetails, updateAppointmentDetail } from './appointmentAction'
const appointmentInfo = localStorage.getItem('appointmentInfo')

const initialState = {
    loading: false,
    appointment: JSON.parse(appointmentInfo),
    error: null,
    success: false,  // for monitoring the registration process.
    appointments: []
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {},
    extraReducers: {
        // create service
        [bookAppointment.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [bookAppointment.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [bookAppointment.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },

        // All User appointment
        [allAppointments.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [allAppointments.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.appointments = payload
            state.success = true // registration successful
        },
        [allAppointments.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },

        // detailer Profile
        [getAppointmentDetails.pending]: (state) => {
            state.loading = true
        },
        [getAppointmentDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.appointment = payload
        },
        [getAppointmentDetails.rejected]: (state, { payload }) => {
            state.loading = false
        },

        // create service
        [updateAppointmentDetail.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [updateAppointmentDetail.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [updateAppointmentDetail.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },
    }
})

export default appointmentSlice.reducer