import { createAsyncThunk } from "@reduxjs/toolkit"
import { DetailersAPI } from "../../../apis/DetailersAPI"

export const getDetailerDetails = createAsyncThunk(
    'detailer/getDetailerDetails',
    async (data, { rejectWithValue }) => {
      try {  
        // configure authorization header with Detailer's token
        // const data  = await DetailersAPI.getUserDetail({_id});
        localStorage.setItem('detailerInfo', JSON.stringify(data))
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

export const getAllDetailers = createAsyncThunk(
  'detailer/getAllDetailer',
  async (_, { rejectWithValue }) => {
    try {
      // configure authorization header with user's token
      const data  = await DetailersAPI.getAllDetailers();
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.error.message)
      } else {
        return rejectWithValue(error.response.data.error.message)
      }
    }
  }
)

export const updateDetailerProfile = createAsyncThunk(
  // action type string
  'detailer/updateDetailerProfile',
  // callback function
  async ({_id, firstName, lastName, phone, state, city, address, bio}, { rejectWithValue }) => {
      try {
          // make request to backend
          const response =  await DetailersAPI.updateUserProfile({_id} , { firstName, lastName, phone, state, city, address, bio});
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

export const becomeADetailer = createAsyncThunk(
    // action type string
    'detailer/becomeDetailer',
    // callback function
    async ({_id, services, address, IDNumber, file}, { rejectWithValue }) => {
        try {
            // make request to backend
            const response =  await DetailersAPI.becomeADetailer({_id} , { services, address, IDNumber, file});
            localStorage.setItem("userInfo", JSON.stringify(response.agent))
            // console.log(response)
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