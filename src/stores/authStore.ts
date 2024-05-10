// libraries
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const initialState = {
    token: null,
    username: null,
    panel_url: null,
    status_id: null
}

const useAuthStore = create(persist((set) => ({
        auth: initialState,
        login: (data) => set((state) => ({
            auth: {
                ...state.auth,
                token: data.token,
                username: data.username,
                panel_url: data.panel_url,
                status_id: data.status_id,
            }
        })),
        changeStatusId: (status_id) => set((state) => ({
            auth: {
                ...state.auth,
                status_id: status_id,
            }
        })),
        logout: () => set({
            auth: initialState
        }),
    }),
    {
        name: "auth",
        // storage: createJSONStorage(() => sessionStorage)
    }
));

export default useAuthStore;