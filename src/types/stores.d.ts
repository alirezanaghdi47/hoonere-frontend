export interface IAppState {
    isOpenDrawer: boolean,
    isDark: boolean,
}

export interface IAppStore {
    app: IAppState,
    showDrawer: () => void,
    hideDrawer: () => void,
    toggleTheme: () => void,
}

export interface IAuthState {
    token: string | null,
    username: string | null,
    panel_url: string | null,
    status_id: number | null
}

export interface IAuthStore {
    auth: IAuthState,
    login: (data: IAuthState) => void,
    changeStatusId: (status_id: number) => void,
    logout: () => void,
}