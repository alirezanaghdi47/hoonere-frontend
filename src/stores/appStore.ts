// libraries
import {create} from 'zustand';
import {persist} from "zustand/middleware";

const initialState: IAppState = {
    isOpenDrawer: false,
    isDark: false,
    notifications: []
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
                notifications: data
            }
        })),
    }), {
        name: "panel-app",
        version: 1
    }),
);


interface IAppState {
    isOpenDrawer: boolean,
    isDark: boolean,
    notifications: {
        id: number,
        project_id: string,
        message: string,
        type: string,
        sub_type: string,
        target_id: string
    }[]
}

interface IAppStore {
    app: IAppState,
    showDrawer: () => void,
    hideDrawer: () => void,
    toggleTheme: () => void,
    setNotifications: (data) => void
}

export default useAppStore;