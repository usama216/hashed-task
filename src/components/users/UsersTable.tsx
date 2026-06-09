"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { useFilteredUsers } from "@/hooks/useUsers";
import { cn } from "@/lib/utils/cn";
import { AddUserModal } from "./AddUserModal";
import { EditUserModal } from "./EditUserModal";
import { UserDetailModal } from "./UserDetailModal";
import type { User, UserRole, UserStatus } from "@/types";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-400" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function statusVariant(status?: UserStatus) {
  return status === "active" ? "active" : "inactive";
}

function roleVariant(role?: UserRole) {
  if (role === "admin") return "admin";
  if (role === "editor") return "editor";
  return "member";
}

export function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { users, isLoading, isError, error, totalPages, totalUsers, refetch } =
    useFilteredUsers(search, page);

  return (
    <section className="overflow-hidden rounded-2xl border border-brand-light bg-white shadow-sm shadow-brand-dark/5">
      <div className="flex flex-col gap-4 border-b border-brand-light bg-gradient-to-r from-brand-light/30 to-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-dark/10">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-brand-dark" aria-hidden>
              <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M1.5 15c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="13" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 15c0-1.38 1.343-2.5 3-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-brand-dark">Team members</h2>
            <p className="mt-0.5 text-xs text-zinc-400">{totalUsers} users in directory</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
            <input
              placeholder="Search name or email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-zinc-200/80 bg-white py-2.5 pl-9 pr-3.5 text-sm text-brand-dark shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/15 sm:w-72"
            />
          </div>
          <Button onClick={() => setAddOpen(true)} className="shrink-0">
            <PlusIcon />
            Add user
          </Button>
        </div>
      </div>

      <div className="px-2 pb-3 pt-2 sm:px-4">
        {isLoading && <TableSkeleton />}

        {isError && (
          <div className="py-12 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button className="mt-4" variant="secondary" size="sm" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !isError && users.length === 0 && (
          <EmptyState message={search ? "No matches." : "No users yet."} />
        )}

        {!isLoading && !isError && users.length > 0 && (
          <>
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-brand-dark/50">
                    <th className="rounded-l-xl bg-brand-light/50 px-4 py-3">User</th>
                    <th className="bg-brand-light/50 px-4 py-3">Email</th>
                    <th className="bg-brand-light/50 px-4 py-3">Role</th>
                    <th className="bg-brand-light/50 px-4 py-3">Status</th>
                    <th className="rounded-r-xl bg-brand-light/50 px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-light/80">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="group cursor-pointer transition-colors hover:bg-brand-light/25"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={user.avatar} alt={user.first_name} />
                          <div>
                            <p className="font-medium text-brand-dark">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-xs text-zinc-400">ID {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-zinc-600">{user.email}</td>
                      <td className="px-4 py-4">
                        <Badge variant={roleVariant(user.role)}>{user.role ?? "member"}</Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={statusVariant(user.status)} dot>
                          {user.status ?? "active"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost" onClick={() => setSelectedUser(user)}>
                            View
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setEditingUser(user)}>
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2.5 p-2 md:hidden">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-xl border border-brand-light bg-white p-4 shadow-sm transition-all active:scale-[0.99] active:bg-brand-light/30"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar src={user.avatar} alt={user.first_name} />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-brand-dark">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="truncate text-sm text-zinc-500">{user.email}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <Badge variant={roleVariant(user.role)}>{user.role ?? "member"}</Badge>
                        <Badge variant={statusVariant(user.status)} dot>
                          {user.status ?? "active"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedUser(user)}>
                      View
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingUser(user)}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between rounded-xl bg-brand-light/30 px-4 py-3.5">
              <span className="text-xs text-zinc-500">
                Showing page{" "}
                <span className="font-semibold text-brand-dark">{page}</span> of{" "}
                <span className="font-semibold text-brand-dark">{totalPages}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={cn(
                      "hidden h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors sm:inline-flex",
                      n === page
                        ? "bg-brand text-white shadow-sm"
                        : "text-zinc-500 hover:bg-white hover:text-brand-dark",
                    )}
                  >
                    {n}
                  </button>
                ))}
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <AddUserModal open={addOpen} onClose={() => setAddOpen(false)} />
      <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} />
      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </section>
  );
}
