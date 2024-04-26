// libraries
import {create} from 'zustand';

const initialState = {
    isOpenDrawer: false,
}

const useAppStore = create((set) => ({
        app: initialState,
        showDrawer: () => set((state) => ({
            app: {
                isOpenDrawer: true,
            }
        })),
        hideDrawer: () => set((state) => ({
            app: {
                isOpenDrawer: false,
            }
        })),
    }),
);

export default useAppStore;