// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {decodeData, encodeData} from "@/utils/functions.ts";

export const authService = async (data) => {
    try {
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/auth/sendAuthConfirmCode", formData);

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const verifyService = async (data) => {
    try {
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/auth/doAuth", formData);

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data)),
        }
    } catch (err) {
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const loginService = async (data) => {
    try {
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/auth/doLoginWithStaticPassword", formData);

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const registerService = async (data) => {
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
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const captchaService = async (data) => {
    try {
        await axios.get(process.env.API_URL + `/auth/getCaptcha/${data.code}?id=${data.id}`);
        return process.env.API_URL + `/auth/getCaptcha/${data.code}?id=${data.id}`;
    } catch (err) {
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const logoutService = async () => {
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
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}



export interface IAuth {
    mobile: string,
}

export interface ILogin {
    username: string,
    password: string,
    captcha: string
    captcha_id: string,
}

export interface IRegister {
    username: string,
    password: string,
    password_confirmation: string,
}

export interface IVerify {
    code: string,
    mobile: string,
}