import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authClient } from "../lib/auth-client";

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  displayName?: string;
  image?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data } = await authClient.signIn.email({
            email,
            password,
          });

          const userData: User = {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username || data.user.email.split('@')[0],
            name: data.user.name,
            displayName: data.user.name,
            image: data.user.image,
            avatarUrl: data.user.image,
            emailVerified: data.user.emailVerified,
            createdAt: data.user.createdAt?.toISOString(),
          };

          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.message || "Credenciais inválidas";
          throw new Error(message);
        }
      },

      register: async (email: string, password: string, username: string) => {
        set({ isLoading: true });
        try {
          const { data } = await authClient.signUp.email({
            email,
            password,
            name: username,
          });

          const userData: User = {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username || data.user.email.split('@')[0],
            name: data.user.name,
            displayName: data.user.name,
            image: data.user.image,
            avatarUrl: data.user.image,
            emailVerified: data.user.emailVerified,
            createdAt: data.user.createdAt?.toISOString(),
          };

          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.message || "Erro ao criar conta";
          throw new Error(message);
        }
      },

      logout: async () => {
        try {
          await authClient.signOut();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { data } = await authClient.getSession();

          if (data?.user) {
            const userData: User = {
              id: data.user.id,
              email: data.user.email,
              username: data.user.username || data.user.email.split('@')[0],
              name: data.user.name,
              displayName: data.user.name,
              image: data.user.image,
              avatarUrl: data.user.image,
              emailVerified: data.user.emailVerified,
              createdAt: data.user.createdAt?.toISOString(),
            };

            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
