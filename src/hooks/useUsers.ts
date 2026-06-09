"use client";

import { useMemo } from "react";
import { useGetAllUsersQuery } from "@/store/api/usersApi";
import { withMeta } from "@/lib/utils/userStats";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { useUserStore } from "@/stores/userStore";
import type { User } from "@/types";

export function useUsers() {
  const meta = useUserStore((state) => state.meta);
  const localUsers = useUserStore((state) => state.localUsers);
  const { data, isLoading, isError, error, refetch } = useGetAllUsersQuery();

  const users = useMemo(() => {
    if (!data) {
      return localUsers.map((user) => withMeta(user, meta));
    }

    const apiIds = new Set(data.map((user) => user.id));
    const merged: User[] = [
      ...localUsers.filter((user) => !apiIds.has(user.id)),
      ...data,
    ];

    return merged.map((user) => withMeta(user, meta));
  }, [data, localUsers, meta]);

  return {
    users,
    isLoading,
    isError,
    error: getErrorMessage(error),
    refetch,
  };
}

export function useFilteredUsers(search: string, page: number, perPage = 6) {
  const { users, ...query } = useUsers();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter((user) => {
      const name = `${user.first_name} ${user.last_name}`.toLowerCase();
      return name.includes(term) || user.email.toLowerCase().includes(term);
    });
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  return {
    ...query,
    users: paginatedUsers,
    totalUsers: filtered.length,
    totalPages,
  };
}
