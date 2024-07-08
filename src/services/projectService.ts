// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {cleaningObject, decodeData, encodeData} from "@/utils/functions.ts";

export const readAllProjectService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleaningObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/index", formData, {
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

export const createProjectService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        const {logo, ...rawData} = data;

        if (Object.keys(logo).length > 0) formData.append("logo", logo);
        formData.append("data", encodeData(JSON.stringify(rawData)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/create", formData, {
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

export const updateProjectService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        const {logo, ...rawData} = data;

        if (Object.keys(logo).length > 0) formData.append("logo", logo);
        formData.append("data", encodeData(JSON.stringify(rawData)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/update", formData, {
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

export const readProjectService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/show", formData, {
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

export const deleteProjectService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/destroy", formData, {
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

export const readAllProjectMemberByFoaService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleaningObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/getProjectMembersByFOA", formData, {
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