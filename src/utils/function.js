import api from "./api";
import toast from "react-hot-toast";

export default async function DynamicApiCall(url, method, UserToken, parameter) {
    try {
        const headers = { Authorization: UserToken }
        const config = {
            headers: headers,
        };
        let apiResponse;

        switch (method) {
            case 'get':
                apiResponse = await api.get(url, config);
                break;
            case 'post':
                apiResponse = await api.post(url, parameter, config);
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
        if (apiResponse.data) {
            // Show different types of toasts based on conditions
            if (apiResponse.data.status === true && apiResponse.status === 200  && method.toUpperCase() !== 'GET') {
                toast.success(apiResponse.data.message, { autoClose: 2000 });
            } else if (apiResponse.data.status === false && apiResponse.status === 200) {
                toast.info(apiResponse.data.message, { autoClose: 2000 });
            }

            return apiResponse.data;
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            let errorMessage = error?.response?.data?.errors ??
                error?.response?.data?.message ??
                "Bad Request"
            console.log("Error:: ", errorMessage, error.response.status)

            toast.error(`API call failed: ${errorMessage}`);
        } else {
            return "OOPs something went wrong.";
        }
        throw error;
    }
}

