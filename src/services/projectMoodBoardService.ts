// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {cleanObject, decodeData, encodeData} from "@/utils/functions.ts";

export const readAllProjectMoodBoardService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/moodboards/index", formData, {
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

export const readProjectMoodBoardService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/moodboards/show", formData, {
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

export const createProjectMoodBoardService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        const {content, ...rawData} = data;

        if (["1", "3"].includes(data.type)) {
            formData.append("content", content);
            formData.append("data", encodeData(JSON.stringify(cleanObject(rawData))));
        } else {
            formData.append("data", encodeData(JSON.stringify(cleanObject({...rawData, content}))));
        }

        const response = await axios.post(process.env.API_URL + "/panel/projects/moodboards/create", formData, {
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

export const deleteProjectMoodBoardsService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/moodboards/destroy", formData, {
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



export interface IReadAllProjectMoodBoard {
    project_id: string,
    title: string | null,
    type: string | null,
    page: number,
    per_page: number,
}

export interface IReadProjectMoodBoard {
    project_id: string
    moodboard_id: string,
}

export interface ICreateProjectMoodBoard {
    project_id: string,
    title: string | null,
    type: string | null,
    content: unknown
}

export interface IDeleteProjectMoodBoard {
    project_id: string
    moodboard_id: string,
}