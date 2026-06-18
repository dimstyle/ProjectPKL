import { create } from "zustand";

export const useAuthStore = create(set => ({
    accessToken: "",
    user: null,
    error: null,
    loading: false,

    setAccessToken: token => set({ accessToken: token }),
    
    setUser: user => set({ user }),
    
    setError: error => set({ error }),
    
    setLoading: loading => set({ loading }),
    
    logout: () => set({ accessToken: null, user: null, error: null }),
    
    clearError: () => set({ error: null })
}))