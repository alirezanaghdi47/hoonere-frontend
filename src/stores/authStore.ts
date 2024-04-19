// libraries
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
        token: null,
        login: () => set((state) => ({
            token: "123"
        })),
        logout: () => set({
            token: null
        }),
    }),
    {
        name: "auth",
        storage: createJSONStorage(() => sessionStorage)
    }
));

export default useAuthStore;