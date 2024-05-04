// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {decodeData, encodeData} from "@/utils/functions.ts";

export const sendAuthConfirmCodeService = async (data) => {
    try {
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/auth/sendAuthConfirmCode", formData);

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        return {
            message: err?.response?.data?.message,
            error: true,
        };
    }
}

export const doAuthService = async (data) => {
    try {
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/auth/doAuth", formData);

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data)),
        }
    } catch (err) {
        return {
            message: err?.response?.data?.message,
            error: true,
        };
    }
}

export const doLoginWithStaticPasswordService = async (data) => {
    console.log(data)

    try {
        const formData = new FormData();
        formData.append("data", encodeData(JSON.stringify(data)));
        const response = await axios.post(process.env.API_URL + "/auth/doLoginWithStaticPassword", formData);

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        return {
            message: err?.response?.data?.message,
            error: true,
        };
    }
}

export const completeRegisterService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/auth/completeRegister", formData, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        return {
            message: err?.response?.data?.message,
            error: true,
        };
    }
}

export const getCaptchaService = async (data) => {
    try {
        const response = await axios.get(process.env.API_URL + `/auth/getCaptcha/${data.code}?id=${data.id}`);
        return process.env.API_URL + `/auth/getCaptcha/${data.code}?id=${data.id}`;
    } catch (err) {
        return {
            message: err?.response?.data?.message,
            error: true,
        };
    }
}

export const doLogoutService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/auth/doLogout", null, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data)),
        }
    } catch (err) {
        return {
            message: err?.response?.data?.message,
            error: true,
        };
    }
}