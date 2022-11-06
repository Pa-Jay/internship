import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const AppointmentAPI = {
    bookAppointment: async (appointmentDetails, cancel = false) => {
        const response = await api.request({
            url: 'api/v1/appointment/create',
            method:"POST",
            data: appointmentDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    }, 

    getAllUserAppointments: async (cancel = false) =>  {
        const response = await api.request({
            url: 'api/v1/appointment/all',
            method:"GET",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

    updateAppointment: async ({_id}, updateDetails, cancel = false) => {
        const response = await api.request({
            url: `api/v1/appointment/update/${_id}`,
            method: "PUT",
            data: updateDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

    getAppointmentDetail: async (_id, cancel = false) =>  {
        const response = await api.request({
            url: `api/v1/appointment/${_id}`,
            method:"GET",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },
}

const cancelApiObject = defineCancelApiObject(AppointmentAPI);
