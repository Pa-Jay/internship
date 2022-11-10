import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

const newsSetup = axios.create({
    withCredentials: true,
    baseURL: "http://api.mediastack.com/v1/sources?access_key=d68a196725f8675da09827997598d39f"
})
// news.base
export const NewsAPI = {
    getAll: async function (cancel = false) {
        const response = await newsSetup.request({
            url: "/news/",
            method: 'GET',
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
        })
    
        return response.data.products
    },
}

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(ProductAPI)