import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './features/users/usersSlice';
import detailersReducer from "./features/detailers/detailerSlice";
import appointmentReducer from "./features/appointments/appointmentSlice"
export const store = configureStore({
    reducer: {
        user: usersReducer,
        detailer: detailersReducer,
        appointment: appointmentReducer,
    }
})