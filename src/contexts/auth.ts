import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthStore = {
  username: string | undefined;
  accessToken: string | undefined;
  roles: string[] | undefined;
  isAuthenticated: boolean;

  setUsername: (name: string | undefined) => void;
  setAccessToken: (accessToken: string | undefined) => void;
  setRoles: (roles: string[] | undefined) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clear: () => void;
};

export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      username: undefined,
      accessToken: undefined,
      roles: undefined,
      isAuthenticated: false,

      setUsername: (name: string | undefined) => set({ username: name }),
      setAccessToken: (accessToken: string | undefined) =>
        set({ accessToken: accessToken }),
      setRoles: (roles: string[] | undefined) => set({ roles: roles }),
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      clear: () =>
        set({
          username: undefined,
          accessToken: undefined,
          roles: undefined,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-store",
    },
  ),
);
