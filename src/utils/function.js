import api from "./api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function DynamicApiCall(url, method, UserToken, parameter) {
    try {
        console.log("config:: ", url, method, UserToken)

        const headers = UserToken ? { Authorization: UserToken } : {};
        const config = {
            headers,
        };
        let apiResponse;

        switch (method) {
            case 'get':
                console.log("config:: ", config)
                apiResponse = await api.get(url, config);
                break;
            case 'post':
                apiResponse = await api.post(url, parameter, config);
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        // Handle success
        if (apiResponse.data) {
            // Show success notification
            toast.success('API call successful', { autoClose: 2000 });
            return apiResponse.data;
        }
    } catch (error) {
        console.error("Error:", error.message);

        // Show error notification
        toast.error(`API call failed: ${error.message}`, { autoClose: 2000 });
        throw error; // Re-throw the error to propagate it up the call stack if needed
    }
}
