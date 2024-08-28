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
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/profile/me", null, {
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
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/profile/bankCards/get", null, {
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
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/profile/job/getMyFieldsOfActivity", null, {
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