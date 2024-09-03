// libraries
import {create} from 'zustand';
import {persist} from "zustand/middleware";

const initialState: IAppState = {
    isOpenDrawer: false,
    isDark: false,
    notifications: {
        project: {
            index: 0,
            invited: 0,
        },
        affiche: {
            index: 0,
            invited: 0,
        },
        contract: {
            index: 0,
            invited: 0,
        },
        contract_comment: {
            index: 0,
            invited: 0,
        },
    }
}

const useAppStore = create<IAppStore>()(persist((set) => ({
        app: initialState,
        showDrawer: () => set((state) => ({
            app: {
                ...state.app,
                isOpenDrawer: true,
            }
        })),
        hideDrawer: () => set((state) => ({
            app: {
                ...state.app,
                isOpenDrawer: false,
            }
        })),
        toggleTheme: () => set((state) => ({
            app: {
                ...state.app,
                isDark: !state.app.isDark,
            }
        })),
        setNotifications: (data) => set((state) => ({
            app: {
                ...state.app,
                notifications: {
                    project: {
                        index: data.project.index,
                        invited: data.project.invited,
                    },
                    affiche: {
                        index: data.affiche.index,
                        invited: data.affiche.invited,
                    },
                    contract: {
                        index: data.contract.index,
                        invited: data.contract.invited,
                    },
                    contract_comment: {
                        index: data.contract_comment.index,
                        invited: data.contract_comment.invited,
                    },
                }
            }
        })),
    }), {
        name: "panel-app"
    }),
);


interface IAppState {
    isOpenDrawer: boolean,
    isDark: boolean,
    notifications: {
        project: {
            index: number,
            invited: number,
        },
        affiche: {
            index: number,
            invited: number,
        },
        contract: {
            index: number,
            invited: number,
        },
        contract_comment: {
            index: number,
            invited: number,
        },
    }
}

interface IAppStore {
    app: IAppState,
    showDrawer: () => void,
    hideDrawer: () => void,
    toggleTheme: () => void,
    setNotifications: (data) => void
}

export default useAppStore;