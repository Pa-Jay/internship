import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const AuthAPI = {
    signup: async (signUpDetails, cancel = false) =>  {
        const response = await api.request({
            url: 'api/v1/auth/register',
            method:"POST",
            data: signUpDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
        })

        return response.data
    },

    login: async (loginDetails, cancel = false) => {
        const response = await api.request({
            url: "api/v1/auth/login",
            method: "POST",
            data: loginDetails,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal: undefined        
        })

        return response.data
    }
}

const cancelApiObject = defineCancelApiObject(AuthAPI);