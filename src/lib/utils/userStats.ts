import type { DashboardStats, User, UserMeta } from "@/types";

export function getDefaultStatus(id: number): UserMeta["status"] {
  return id % 2 === 0 ? "active" : "inactive";
}

export function withMeta(user: User, metaMap: Record<number, UserMeta>): User {
  const saved = metaMap[user.id];

  return {
    ...user,
    role: saved?.role ?? user.role ?? "member",
    status: saved?.status ?? user.status ?? getDefaultStatus(user.id),
  };
}

export function getDashboardStats(users: User[]): DashboardStats {
  let active = 0;
  let inactive = 0;
  let newUsers = 0;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  for (const user of users) {
    if (user.status === "active") active++;
    if (user.status === "inactive") inactive++;

    if (user.createdAt) {
      if (new Date(user.createdAt).getTime() >= weekAgo) newUsers++;
    } else if (user.id > 10) {
      newUsers++;
    }
  }

  return {
    total: users.length,
    active,
    inactive,
    newUsers,
  };
}
