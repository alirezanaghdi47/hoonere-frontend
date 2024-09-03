// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {decodeData, encodeData} from "@/utils/functions.ts";

export const updateProfileIdentityService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        if (data.user_type === "1") {
            const {profile_img, national_card, ...rawData} = data;

            if (Object.keys(profile_img).length > 0) formData.append("profile_img", profile_img);
            if (Object.keys(national_card).length > 0) formData.append("national_card", national_card);

            formData.append("data", encodeData(JSON.stringify(rawData)));

        } else if (data.user_type === "2") {
            const {profile_img, newspaper_file, ...rawData} = data;

            if (Object.keys(profile_img).length > 0) formData.append("profile_img", profile_img);
            if (Object.keys(newspaper_file).length > 0) formData.append("newspaper_file", newspaper_file);

            formData.append("data", encodeData(JSON.stringify(rawData)));
        }

        const response = await axios.post(process.env.API_URL + "/panel/profile/updateIdentity", formData, {
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

export const readMyProfileService = async () => {
    const {logout} = useAuthStore.getState();

    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/profile/me", null, {
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

export const deleteProfileFileService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/profile/deleteFile", formData, {
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

export const createBankCardService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/profile/bankCards/create", formData, {
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

export const readMyAllBankCardService = async () => {
    const {logout} = useAuthStore.getState();

    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/profile/bankCards/get", null, {
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

export const updateBankCardService = async (data) => {
    try {
        const {token} = useAuthStore.getState().auth;
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/profile/bankCards/update", formData, {
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

export const deleteBankCardService = async (data) => {
    try {
        const {token} = useAuthStore.getState().auth;
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/profile/bankCards/delete", formData, {
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

export const changeStatusOfBankCardService = async (data) => {
    try {
        const {token} = useAuthStore.getState().auth;
        const formData = new FormData();

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/profile/bankCards/changeToMain", formData, {
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

export const readAllMyJobService = async () => {
    const {logout} = useAuthStore.getState();

    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/profile/job/getMyFieldsOfActivity", null, {
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

export const updateOccupationService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        const {resume_file, ...rawData} = data;

        if (Object.keys(resume_file).length > 0) formData.append("resume_file", resume_file);

        formData.append("data", encodeData(JSON.stringify(rawData)));

        const response = await axios.post(process.env.API_URL + "/panel/profile/job/update", formData, {
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


export interface IUpdateProfileIdentityReal {
    profile_img: File | object,
    national_card: File | object,
    username: string | null,
    first_name: string | null,
    last_name: string | null,
    national_code: string | null,
    id_code: string | null,
    birthdate: string | null,
    email: string | null,
    address: string | null,
    postal_code: string | null,
    user_type: string,
}

export interface IUpdateProfileIdentityLegal {
    profile_img: File | object,
    newspaper_file: File | object,
    username: string | null,
    company_name: string | null,
    register_code: string | null,
    economic_code: string | null,
    address: string | null,
    postal_code: string | null,
    telephone: string | null,
    email: string | null,
    representatives: unknown
    user_type: string,
}

export interface IUpdateOccupation {
    fields_of_activity: unknown,
    resume_file: File | object,
    resume_text: string | null,
}

export interface ICreateBankCard {
    name: string | null,
    card_number: string,
    card_shaba: string,
    account_id: string
}

export interface IUpdateBankCard {
    card_id: string,
    name: string | null,
    card_number: string,
    card_shaba: string,
    account_id: string
}

export interface IChangeStatusOfBankCard {
    card_id: string
}

export interface IDeleteBankCard {
    card_id: string
}

export interface IDeleteProfileFile {
    file_type: string
}
