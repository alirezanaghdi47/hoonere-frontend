// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {decodeData, encodeData} from "@/utils/functions.ts";

export const readAllJobService = async () => {
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
        // if (err?.response.status === 500) return window.location.replace("/server-down");
    }
}

export const readAllProjectTypeService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getAllProjectTypes", null, {
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

export const readAllInvestorService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getAllInvestors", null, {
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

export const readUserInquiryService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/public/userInquiry", formData, {
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

export const readAllScreenPlayTimeTypeService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getScreenplayTimeTypes", null, {
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

export const readAllScreenPlayLocationSideService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getScreenplayLocationSides", null, {
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

export const readAllAfficheTypeService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getAfficheTypes", null, {
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

export const readAllReceptionTypeService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getReceptionTypes", null, {
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

export const readAllProjectMoodBoardTypeService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getMoodboardTypes", null, {
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

export const readAllProjectContractArticleService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getContractDefaultArticles", null, {
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

export const readAllProjectContractSectionService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getContractReadySections", null, {
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

export const readAllProjectContractInsertionArticleService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getInsertionDefaultArticles", null, {
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

export const readAllProjectContractInsertionSectionService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getInsertionReadySections", null, {
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

export const readAllProjectConfirmationService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getProjectMemberConfirmationStatus", null, {
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

export const readAllNotificationService = async () => {
    try {
        const {token} = useAuthStore.getState().auth;

        const response = await axios.post(process.env.API_URL + "/panel/public/getNotifications", null, {
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

export interface IReadUserInquiry {
    username: string | null,
    foa_id: string,
    foa_parent_id: string,
}
