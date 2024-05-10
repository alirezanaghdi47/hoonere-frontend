// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {decodeData} from "@/utils/functions.ts";

export const allJobService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getAllFieldsOfActivity", null, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        const {logout} = useAuthStore.getState();

        if (err?.response.status === 401) return logout();
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}
