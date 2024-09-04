// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {cleanObject, decodeData, encodeData} from "@/utils/functions.ts";

export const readAllProjectAfficheService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/index", formData, {
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

export const readAllInvitedProjectAfficheService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/invited", formData, {
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

export const readProjectAfficheService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/show", formData, {
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

export const readInvitedProjectAfficheService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/invited/preview", formData, {
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

export const readAllProjectAfficheAddressService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/getAddresses", formData, {
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

export const readAllProjectAfficheActorService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/getActors", formData, {
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

export const readAllProjectAfficheMemberService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/getMembers", formData, {
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

export const readAllProjectAfficheReceptionService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/getReceptions", formData, {
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

export const readAllProjectAfficheScreenPlayService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/getScreenplays", formData, {
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

export const readAllInvitedProjectAfficheAddressService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/invited/preview/getAddresses", formData, {
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

export const readAllInvitedProjectAfficheActorService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/invited/preview/getActors", formData, {
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

export const readAllInvitedProjectAfficheMemberService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/invited/preview/getMembers", formData, {
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

export const readAllInvitedProjectAfficheReceptionService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/invited/preview/getReceptions", formData, {
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

export const readAllInvitedProjectAfficheScreenPlayService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/invited/preview/getScreenplays", formData, {
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

export const readAllProjectAfficheHistoryService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/getHistory", formData, {
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

export const createProjectAfficheService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/create", formData, {
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

export const updateProjectAfficheService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/update", formData, {
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

export const deleteProjectAfficheService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/affiches/destroy", formData, {
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



export interface IReadAllProjectAffiche {
    project_id: string,
    number_string: string,
    type: string,
    affiche_date: string,
    page: number,
    per_page: number,
}

export interface IReadAllInvitedProjectAffiche {
    project_id: string,
    number_string: string,
    type: string,
    affiche_date: string,
    page: number,
    per_page: number,
}

export interface IReadProjectAffiche {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadInvitedProjectAffiche {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllProjectAfficheAddress {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllProjectAfficheActor {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllProjectAfficheMember {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllProjectAfficheReception {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllProjectAfficheScreenPlay {
    project_id: string,
    affiche_id: string,
    text?: string,
    part?: string,
    sequence?: string,
    page: number,
    per_page: number,
    get_last: number
}

export interface IReadAllInvitedProjectAfficheAddress {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllInvitedProjectAfficheActor {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllInvitedProjectAfficheMember {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllInvitedProjectAfficheReception {
    project_id: string,
    affiche_id: string,
    get_last: number
}

export interface IReadAllInvitedProjectAfficheScreenPlay {
    project_id: string,
    affiche_id: string,
    text?: string,
    part?: string,
    sequence?: string,
    page: number,
    per_page: number,
    get_last: number
}

export interface ICreateProjectAffiche {
    project_id: string,
    title: string,
    description: string,
    time_type_id: string,
    location_side_id: string,
    type: string,
    is_off: number,
    affiche_date: string,
    start_date: string,
    coming_time: string,
    start_time: string,
    addresses: { address: string, lat: string, lon: string }[],
    auto_motivation_sentence: number,
    motivation_sentence: string,
    actors: [],
    members: [],
    receptions: [],
    screenplays: [],
}

export interface IUpdateProjectAffiche {
    project_id: string,
    affiche_id: string,
    title: string,
    description: string,
    time_type_id: string,
    location_side_id: string,
    type: string,
    is_off: number,
    affiche_date: string,
    start_date: string,
    coming_time: string,
    start_time: string,
    addresses: { address: string, lat: string, lon: string }[],
    auto_motivation_sentence: number,
    motivation_sentence: string,
    actors: [],
    members: [],
    receptions: [],
    screenplays: [],
}

export interface IDeleteProjectAffiche {
    project_id: string,
    affiche_id: string,
}

export interface IReadAllProjectAfficheHistory {
    project_id: string,
    affiche_id: string,
    text: string,
    date: string,
    page: number,
    per_page: number,
}