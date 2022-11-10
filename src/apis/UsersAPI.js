import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const UsersAPI = {
    getAllUsers: async (cancel = false) =>  {
        const response = await api.request({
            url: 'api/v1/users/all',
            method:"GET",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

    getUserDetail: async (cancel = false) =>  {
        const response = await api.request({
            url: 'api/v1/users/single',
            method:"GET",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },

    updateUserProfile: async ({_id}, updateDetails, cancel = false) => {
        const response = await api.request({
            url: `api/v1/users/update/${_id}`,
            method: "PUT",
            data: updateDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

    updatePassword: async (newDetails, cancel = false) => {
        const response = await api.request({
            url: `api/v1/users/update-password`,
            method: "PUT",
            data: newDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

    // Services Logic
    getAllServices: async (cancel = false) =>  {
        const response = await api.request({
            url: 'api/v1/users/service/all',
            method:"GET",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

    addService: async (serviceDetails, cancel = false) => {
        const response = await api.request({
            url: 'api/v1/users/service/create',
            method: "POST",
            data: serviceDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        console.log(response.data)
        return response.data
    },
}

const cancelApiObject = defineCancelApiObject(UsersAPI);