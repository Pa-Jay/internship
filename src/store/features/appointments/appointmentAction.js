import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppointmentAPI } from '../../../apis/AppointmentAPI'

export const bookAppointment = createAsyncThunk(
    'appointment/book',

    async ({services, date, detailer, price, time}, {rejectWithValue}) => {
        try {
            // make request to backend
            const response =  await AppointmentAPI.bookAppointment({services, date, detailer, price, time})
            return response
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.error.message)
            } else {
                return rejectWithValue(error.response.data)
            }
        }

     
    }
) 

export const allAppointments = createAsyncThunk(
    'appointment/all',

    async (_, {rejectWithValue}) => {
        try {
            // make request to backend
            const response =  await AppointmentAPI.getAllUserAppointments()
            // console.log(response)
            return response
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.error.message)
            } else {
                return rejectWithValue(error.response.data)
            }
        }
        
     
    }
)

export const getAppointmentDetails = createAsyncThunk(
    'appointment/getAppointment',
    async (arg, { rejectWithValue }) => {
      try {  
        // configure authorization header with Detailer's token
        const data  = await AppointmentAPI.getAppointmentDetail(arg._id);
        localStorage.setItem('appointmentInfo', JSON.stringify(data))
        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.error.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
)

export const updateAppointmentDetail = createAsyncThunk(
    // action type string
    'appointment/updateAppointment',
    // callback function
    async ({_id, status, services, detailer, date, time, price}, { rejectWithValue }) => {
        try {
            // make request to backend
            const response =  await AppointmentAPI.updateAppointment({_id} , { date, detailer, services, price, time, status });
            return response
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.error.message)
            } else {
                return rejectWithValue(error.response.data.error.message)
            }
        }
    
  })