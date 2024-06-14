import {convertGregorianToJalali} from "@/utils/functions.ts";
import {array} from "yup";

export interface IAuth {
    mobile: string,
}

export interface ILogin {
    username: string,
    password: string,
    captcha: number
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

export interface IUpdateProfile {
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
}

export interface IUpdateOccupation {
    fields_of_activity: array,
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

export interface IReadUserInquiry {
    username: string | null,
    foa_id: string,
    foa_parent_id: string,
}

export interface IReadAllProject {
    text: string | null,
    type_id: string | null,
    page: number,
    per_page: number,
}

export interface IReadProject {
    project_id: string,
}

export interface ICreateProject {
    logo: File | object,
    type_id: string | null,
    title: string | null,
    description: string | null,
    producer: string | null,
    count_of_parts: number,
    time_of_parts: number,
    location: string | null,
}

export interface IUpdateProject {
    project_id: string,
    logo: File | object,
    type_id: string | null,
    title: string | null,
    description: string | null,
    producer: string | null,
    count_of_parts: number,
    time_of_parts: number,
    location: string | null,
}

export interface IDeleteProject {
    project_id: string,
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
    member_id: string,
    project_id?: string,
    foa_parent_id?: string,
    foa_child_id?: string,
}
