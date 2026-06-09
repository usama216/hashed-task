import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserFormData, UserMeta } from "@/types";

interface UserStoreState {
  meta: Record<number, UserMeta>;
  localUsers: User[];
  setUserMeta: (id: number, meta: UserMeta) => void;
  addLocalUser: (user: User) => void;
  updateLocalUser: (id: number, data: UserFormData) => void;
  upsertFromForm: (id: number, data: UserFormData) => void;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      meta: {},
      localUsers: [],

      setUserMeta: (id, meta) =>
        set((state) => ({
          meta: { ...state.meta, [id]: meta },
        })),

      addLocalUser: (user) =>
        set((state) => ({
          localUsers: [user, ...state.localUsers],
          meta: {
            ...state.meta,
            [user.id]: {
              role: user.role ?? "member",
              status: user.status ?? "active",
            },
          },
        })),

      updateLocalUser: (id, data) =>
        set((state) => ({
          localUsers: state.localUsers.map((user) =>
            user.id === id
              ? {
                  ...user,
                  first_name: data.first_name,
                  last_name: data.last_name,
                  email: data.email,
                  role: data.role,
                  status: data.status,
                }
              : user,
          ),
          meta: {
            ...state.meta,
            [id]: { role: data.role, status: data.status },
          },
        })),

      upsertFromForm: (id, data) =>
        set((state) => ({
          meta: {
            ...state.meta,
            [id]: { role: data.role, status: data.status },
          },
        })),
    }),
    {
      name: "user-meta-store",
    },
  ),
);
