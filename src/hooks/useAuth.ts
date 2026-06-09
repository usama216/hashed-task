"use client";

import { useRouter } from "next/navigation";
import { useLoginMutation, useLogoutMutation } from "@/store/api/authApi";
import { baseApi } from "@/store/api/baseApi";
import { useAppDispatch } from "@/store/hooks";
import { useAuthStore } from "@/stores/authStore";
import type { LoginPayload } from "@/types";

export function useLogin() {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);
  const [login, { isLoading }] = useLoginMutation();

  const loginUser = async (values: LoginPayload) => {
    await login(values).unwrap();
    setEmail(values.email);
    router.replace("/dashboard");
    router.refresh();
  };

  return { loginUser, isLoading };
}

export function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clearEmail = useAuthStore((state) => state.clearEmail);
  const [logout, { isLoading }] = useLogoutMutation();

  const logoutUser = async () => {
    await logout().unwrap();
    dispatch(baseApi.util.resetApiState());
    clearEmail();
    router.replace("/login");
    router.refresh();
  };

  return { logoutUser, isLoading };
}
