"use client";

import { toast } from "sonner";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/store/api/usersApi";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { useUserStore } from "@/stores/userStore";
import type { User, UserFormData } from "@/types";

function avatarFor(id: number) {
  const n = ((id - 1) % 12) + 1;
  return `https://reqres.in/img/faces/${n}-image.jpg`;
}

export function useCreateUser() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const addLocalUser = useUserStore((s) => s.addLocalUser);

  const mutateAsync = async (payload: UserFormData) => {
    try {
      const res = await createUser(payload).unwrap();

      addLocalUser({
        id: res.id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        avatar: res.avatar || avatarFor(res.id),
        role: payload.role,
        status: payload.status,
        createdAt: new Date().toISOString(),
      } satisfies User);

      toast.success("Saved");
      return res;
    } catch (err) {
      toast.error(getErrorMessage(err as Parameters<typeof getErrorMessage>[0]));
      throw err;
    }
  };

  return { mutateAsync, isPending: isLoading };
}

export function useUpdateUser() {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const updateLocalUser = useUserStore((s) => s.updateLocalUser);
  const upsertFromForm = useUserStore((s) => s.upsertFromForm);

  const mutateAsync = async ({ id, payload }: { id: number; payload: UserFormData }) => {
    try {
      const res = await updateUser({ id, payload }).unwrap();
      const isLocal = useUserStore.getState().localUsers.some((u) => u.id === id);

      if (isLocal) updateLocalUser(id, payload);
      else upsertFromForm(id, payload);

      toast.success("Updated");
      return res;
    } catch (err) {
      toast.error(getErrorMessage(err as Parameters<typeof getErrorMessage>[0]));
      throw err;
    }
  };

  return { mutateAsync, isPending: isLoading };
}
