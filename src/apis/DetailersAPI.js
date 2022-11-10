import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const DetailersAPI = {
    getAllDetailers: async (cancel = false) =>  {
        const response = await api.request({
            url: 'api/v1/users/detailer/all',
            method:"GET",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },

    getDetailerDetail: async ({_id}, cancel = false) =>  {
        const response = await api.request({
            url: `api/v1/users/detailer/single/${_id}`,
            method:"GET",
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },

    becomeADetailer: async ({_id}, newDetails, cancel = false) => {
        const response = await api.request({
            url: `api/v1/users/become-agent/${_id}`,
            method: "PUT",
            data: newDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },

    updateUserProfile: async ({_id}, updateDetails, cancel = false) => {
        const response = await api.request({
            url: `api/v1/detailers/update/${_id}`,
            method: "PUT",
            data: updateDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })
        return response.data
    },
}

const cancelApiObject = defineCancelApiObject(DetailersAPI);