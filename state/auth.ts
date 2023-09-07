import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IUser } from "@/types/IUser";
import { getUserData } from "@/api/users";

interface AuthStore {
  user: null | IUser; // Define your user type here
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: any; // Define your error type here
  setAuthenticated: (payload: boolean) => void;
  setUser: (payload: any) => void; // Define your user type here
  setIsLoading: (payload: boolean) => void;
  setIsInitializing: (payload: boolean) => void;
  setError: (payload: any) => void; // Define your error type here
  fetchUserData: () => Promise<IUser | null>;
  logoutUser: () => void;
}

const authStore = (set: any): AuthStore => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitializing: true,
  error: null,
  setAuthenticated: (payload: boolean) =>
    set((state: any) => ({
      ...state,
      isAuthenticated: payload,
    })),
  setUser: (payload: any) =>
    set((state: any) => ({
      ...state,
      user: payload,
    })),
  setIsLoading: (payload: boolean) =>
    set((state: any) => ({
      ...state,
      isLoading: payload,
    })),
  setIsInitializing: (payload: boolean) =>
    set((state: any) => ({
      ...state,
      isInitializing: payload,
    })),
  setError: (payload: any) =>
    set((state: any) => ({
      ...state,
      error: payload,
    })),
  fetchUserData: async () => {
    try {
      set({ isLoading: true });
      const { data } = await getUserData();
      if (data.success) {
        set({
          user: data.data,
          isAuthenticated: true,
          isLoading: false,
        });
        return data.data;
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },
  logoutUser: () => {
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    set({
      isAuthenticated: false,
      user: null,
      status: "",
    });
  },
});

export const setAuthHeaders = (token: string) => {
  sessionStorage.setItem("token", token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const useAuth = create<AuthStore>()(devtools(authStore));

export default useAuth;
