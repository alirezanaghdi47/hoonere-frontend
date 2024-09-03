// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {cleanObject, decodeData, encodeData} from "@/utils/functions.ts";

export const readAllProjectMemberService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/members/index", formData, {
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
        // if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const readProjectMemberService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/members/show", formData, {
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
        const {logout} = useAuthStore.getState();

        if (err?.response.status === 401) return logout();
        // if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const createProjectMemberService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/members/create", formData, {
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
        // if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const updateProjectMemberService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/members/update", formData, {
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
        // if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const deleteProjectMemberService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/members/destroy", formData, {
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
        // if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}



export interface IReadAllProjectMember {
    project_id: string,
    text: string | null,
    foa_child_id: string | null,
    foa_parent_id: string | null,
    page: number,
    per_page: number,
}

export interface IReadProjectMember {
    project_id: string,
    member_id: string,
}

export interface ICreateProjectMember {
    project_id: string,
    foa_parent_id: string,
    foa_child_id: string,
    name?: string,
    user_id?: string,
}

export interface IUpdateProjectMember {
    project_id: string,
    member_id: string,
    foa_parent_id: string,
    foa_child_id: string,
    name?: string,
    user_id?: string,
}

export interface IDeleteProjectMember {
    project_id: string,
    member_id: string,
    foa_parent_id: string,
    foa_child_id: string,
}