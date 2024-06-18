// libraries
import {create} from 'zustand';
import {persist} from "zustand/middleware";

// types
import {IAppState , IAppStore} from "@/types/storesType.ts";

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

export default useAppStore;