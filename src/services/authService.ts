// libraries
import axios from "axios";

export const loginService = async (data) => {
    try {
        const response = await axios.post(process.env.API_URL + "", data);
        return response.data;
    } catch (err: any) {
        return {
            message: err?.response?.data?.message,
            status: err?.response?.data?.status,
        };
    }
}