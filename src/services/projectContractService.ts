// libraries
import axios from "axios";

// stores
import useAuthStore from "@/stores/authStore.ts";

// utils
import {cleanObject, decodeData, encodeData} from "@/utils/functions.ts";

export const readAllProjectContractService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/index", formData, {
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

export const readAllInvitedProjectContractService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/invited", formData, {
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

export const readProjectOfficialContractService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/show", formData, {
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

export const readProjectUnOfficialContractService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/informalContracts/show", formData, {
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

export const readInvitedProjectContractService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/invited/preview", formData, {
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

export const createProjectOfficialContractService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/create", formData, {
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

export const createProjectUnOfficialContractService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/informalContracts/create", formData, {
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

export const updateProjectOfficialContractService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/update", formData, {
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

export const updateProjectUnOfficialContractService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/informalContracts/update", formData, {
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

export const deleteProjectOfficialContractService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/destroy", formData, {
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

export const deleteProjectUnOfficialContractService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/informalContracts/destroy", formData, {
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

export const changeProjectContractStatusService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/finalizeContract", formData, {
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

export const readAllProjectContractMemberService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/getProjectMembersForContract", formData, {
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

export const readProjectContractForInsertionService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/getContractInfoForInsertion", formData, {
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

export const readAllProjectContractInsertionService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/insertions/index", formData, {
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

export const readProjectContractInsertionService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/insertions/show", formData, {
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

export const createProjectContractInsertionService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/insertions/create", formData, {
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

export const updateProjectContractInsertionService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/insertions/update", formData, {
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

export const deleteProjectContractInsertionService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/insertions/destroy", formData, {
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

export const changeProjectContractInsertionStatusService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/insertions/finalizeInsertion", formData, {
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

export const checkProjectContractHasSupplementService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/checkContractHasSupplement", formData, {
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

export const sendProjectContractSignatureConfirmCodeService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/sendSignatureConfirmCode", formData, {
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

export const checkProjectContractSignatureConfirmCodeService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/checkSignatureConfirmCode", formData, {
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

export const readAllProjectContractCommentService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/comments/index", formData, {
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

export const readProjectContractCommentService = async (data) => {
    const {logout} = useAuthStore.getState();

    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(data)));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/comments/show", formData, {
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

export const createProjectContractCommentService = async (data) => {
    try {
        const formData = new FormData();
        const {token} = useAuthStore.getState().auth;

        formData.append("data", encodeData(JSON.stringify(cleanObject(data))));

        const response = await axios.post(process.env.API_URL + "/panel/projects/contracts/comments/create", formData, {
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



export interface IReadAllProjectContract {
    project_id: string,
    contract_number: string | null,
    start_date: string | null,
    end_date: string | null,
    page: number,
    per_page: number,
}

export interface IReadAllInvitedProjectContract {
    project_id: string,
    contract_number: string | null,
    start_date: string | null,
    end_date: string | null,
    page: number,
    per_page: number,
}

export interface IReadProjectOfficialContract {
    project_id: string,
    contract_id: string,
    get_last: number,
}

export interface IReadProjectUnOfficialContract {
    project_id: string,
    contract_id: string,
    get_last: number,
}

export interface IReadInvitedProjectContract {
    project_id: string,
    contract_id: string,
    get_last: number,
}

export interface ICreateProjectOfficialContract {
    project_id: string,
    articles: unknown,
    sections: unknown,
    notes: unknown,
    employers: unknown,
    contractors: unknown,
    start_date: string,
    end_date: string,
    total_price: string | number,
    payment_state: string,
    payments: unknown
}

export interface ICreateProjectUnOfficialContract {
    project_id: string,
    articles: unknown,
    sections: unknown,
    notes: unknown,
    employers: unknown,
    contractors: unknown,
    start_date: string,
    end_date: string,
    total_price: string | number,
    payment_state: string,
    payments: unknown
}

export interface IUpdateProjectOfficialContract {
    project_id: string,
    contract_id: string,
    articles: unknown,
    sections: unknown,
    notes: unknown,
    employers: unknown,
    contractors: unknown,
    start_date: string,
    end_date: string,
    total_price: string | number,
    payment_state: string,
    payments: unknown
}

export interface IUpdateProjectUnOfficialContract {
    project_id: string,
    contract_id: string,
    articles: unknown,
    sections: unknown,
    notes: unknown,
    employers: unknown,
    contractors: unknown,
    start_date: string,
    end_date: string,
    total_price: string | number,
    payment_state: string,
    payments: unknown
}

export interface IReadAllProjectContractMember {
    project_id: string,
    foa_parent_id: string,
    foa_child_id: string
}

export interface IChangeProjectContractStatus {
    project_id: string,
    contract_id: string,
}

export interface IDeleteProjectOfficialContract {
    project_id: string,
    contract_id: string,
}

export interface IDeleteProjectUnOfficialContract {
    project_id: string,
    contract_id: string,
}

export interface IReadAllProjectContractInsertion {
    project_id: string,
    contract_id: string,
    insertion_number: string | null,
    start_date: string | null,
    end_date: string | null,
    page: number,
    per_page: number,
}

export interface IReadProjectContractInsertion {
    project_id: string,
    contract_id: string,
    insertion_id: string,
    get_last: number,
}

export interface IReadProjectContractForInsertion {
    project_id: string,
    contract_id: string,
}

export interface ICreateProjectContractInsertion {
    project_id: string,
    contract_id: string,
    articles: unknown,
    sections: unknown,
    is_supplement: number,
    employers: unknown,
    contractors: unknown,
    start_date: string,
    end_date: string,
    total_price: string | number,
    payment_state: string,
    payments: unknown
}

export interface IUpdateProjectContractInsertion {
    project_id: string,
    contract_id: string,
    insertion_id: string,
    articles: unknown,
    sections: unknown,
    employers: unknown,
    contractors: unknown,
    start_date: string,
    end_date: string,
    total_price: string | number,
    payment_state: string,
    payments: unknown
}

export interface IChangeProjectContractInsertionStatus {
    project_id: string,
    contract_id: string,
    insertion_id: string,
}

export interface ICheckProjectContractHasSupplementAction {
    project_id: string,
    contract_id: string,
}

export interface IDeleteProjectContractInsertion {
    project_id: string,
    contract_id: string,
    insertion_id: string,
}

export interface ISendProjectContractSignatureConfirmCode {
    project_id: string,
    contract_id: string,
}

export interface ICheckProjectContractSignatureConfirmCode {
    project_id: string,
    contract_id: string,
    code: string
}

export interface IReadAllProjectContractComment {
    project_id: string,
    contract_id: string,
}

export interface ICreateProjectContractComment {
    project_id: string,
    contract_id: string,
    parent_id: string,
    content: string
}
