// libraries
import {create} from 'zustand';
import {persist} from "zustand/middleware";

const initialState: IAppState = {
    isOpenDrawer: false,
    isDark: false,
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
    }), {
        name: "panel-app"
    }),
);



interface IAppState {
    isOpenDrawer: boolean,
    isDark: boolean,
}

interface IAppStore {
    app: IAppState,
    showDrawer: () => void,
    hideDrawer: () => void,
    toggleTheme: () => void,
}

export default useAppStore;