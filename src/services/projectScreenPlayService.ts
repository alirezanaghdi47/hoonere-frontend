// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {cleanObject, decodeData, encodeData} from "@/utils/functions.ts";

export const readAllProjectScreenPlayService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/screenplays/index", formData, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.data?.error && JSON.parse(decodeData(response.data.data)).length === 0) return logout();

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        if (err?.response.status === 401) return logout();
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const readProjectScreenPlayService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/screenplays/show", formData, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.data?.error && JSON.parse(decodeData(response.data.data)).length === 0) return logout();

        return {
            ...response.data,
            data: JSON.parse(decodeData(response.data.data))
        }
    } catch (err) {
        if (err?.response.status === 401) return logout();
        if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const createProjectScreenPlayService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/screenplays/create", formData, {
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

export const updateProjectScreenPlayService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/screenplays/update", formData, {
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

export const deleteProjectScreenPlayService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/screenplays/destroy", formData, {
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



export interface IReadAllProjectScreenPlay {
    project_id: string,
    page: number,
    per_page: number,
    text: string,
    part: string,
    sequence: string,
}

export interface IReadProjectScreenPlay {
    project_id: string,
    screenplay_id: string,
}

export interface ICreateProjectScreenPlay {
    project_id: string,
    description: string,
    address: string,
    time_type_id: string,
    location_side_id: string,
    part: string,
    sequence: string,
    fields: { title: string, value: string }[]
}

export interface IUpdateProjectScreenPlay {
    project_id: string,
    screenplay_id: string,
    description: string,
    address: string,
    time_type_id: string,
    location_side_id: string,
    part: string,
    sequence: string,
    fields: { title: string, value: string }[]
}

export interface IDeleteProjectScreenPlay {
    screenplay_id: string,
}