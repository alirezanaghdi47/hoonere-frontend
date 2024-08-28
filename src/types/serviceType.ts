export interface IAuth {
    mobile: string,
}

export interface ILogin {
    username: string,
    password: string,
    captcha: string
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
    count_of_parts: string,
    time_of_parts: string,
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

export interface IReadAllProjectAffiche {
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

export interface IReadAllProjectMembersByFoa {
    foa_parent_id: string,
    foa_id: string,
    project_id: string
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

export interface IReadAllProjectContract {
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