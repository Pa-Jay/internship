import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthAPI } from "../../../apis/authApi"
import { UsersAPI } from "../../../apis/UsersAPI"

export const registerUser = createAsyncThunk(
    // action type string
    'user/register',
    // callback function
    async ({ firstName, lastName, phone, TandC, email, password }, { rejectWithValue }) => {
        try {
            // make request to backend
            const response =  await AuthAPI.signup({firstName, lastName, phone, TandC, email, password})
            return response
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.error.message)
            } else {
                return rejectWithValue(error.response.data)
            }
        }
    
    })

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data =  await AuthAPI.login({email, password});
            // store user's token in local storage
            localStorage.setItem('userToken', data.token)
            localStorage.setItem('userInfo', JSON.stringify(data.user))

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.error.message)
            } else {
              return rejectWithValue(error.response.data.error.message)
            }
          }
        }
)

export const userLogout = createAsyncThunk(
  'user/logout',
  async ({ rejectWithValue }) => {
      try {
          // const data =  await AuthAPI.login({email, password});
          // store user's token in local storage
          return localStorage.setItem('userToken', null)
          
      } catch (error) {
          // return custom error message from API if any
          if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.error.message)
          } else {
            return rejectWithValue(error.response.data.error.message)
          }
        }
      }
)

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { rejectWithValue }) => {
      try {
        // get user data from store
        // const { user } = getState()
  
        // configure authorization header with user's token
        const data  = await UsersAPI.getUserDetail();
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

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      // get user data from store
      // const { user } = getState()

      // configure authorization header with user's token
      const data  = await UsersAPI.getAllUsers();
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

export const updateProfile = createAsyncThunk(
  // action type string
  'user/updateProfile',
  // callback function
  async ({_id, firstName, lastName, phone, state, city, address, bio}, { rejectWithValue }) => {
      try {
          // make request to backend
          const response =  await UsersAPI.updateUserProfile({_id} , { firstName, lastName, phone, state, city, address, bio});
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

export const updatePassword = createAsyncThunk(
    "user/changePassword",
    async ({ oldPassword, newPassword, confirmNewPassword}, { rejectWithValue }) => {
       try {
          const response =  await UsersAPI.updatePassword({ oldPassword, newPassword, confirmNewPassword});
          return response
       } catch (error) {
          // return custom error message from API if any
          if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.error.message)
          } else {
              return rejectWithValue(error.response.data.error.message)
          }
       } 
    }
)

// Services

export const getAllServices = createAsyncThunk(
  'user/getAllServices',
  async (_, { rejectWithValue }) => {
    try {

      // configure authorization header with user's token
      const data  = await UsersAPI.getAllServices();
      // console.log(data)
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

export const createService = createAsyncThunk(
  'service/create',
  async ({ name, desc }, { rejectWithValue }) => {
      try {
          const data =  await UsersAPI.addService({name, desc});

          return data
      } catch (error) {
          // return custom error message from API if any
          if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.error.message)
          } else {
            return rejectWithValue(error.response.data.error.message)
          }
        }
      }
)