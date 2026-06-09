"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { useFilteredUsers } from "@/hooks/useUsers";
import { AddUserModal } from "./AddUserModal";
import { EditUserModal } from "./EditUserModal";
import { UserDetailModal } from "./UserDetailModal";
import type { User } from "@/types";

export function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { users, isLoading, isError, error, totalPages, totalUsers, refetch } =
    useFilteredUsers(search, page);

  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-medium">Users ({totalUsers})</h2>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="Search name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="sm:w-64"
          />
          <Button onClick={() => setAddOpen(true)}>Add user</Button>
        </div>
      </div>

      <div className="p-4">
        {isLoading && <TableSkeleton />}

        {isError && (
          <div className="py-8 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button className="mt-3" variant="secondary" size="sm" onClick={() => refetch()}>
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
                  <tr className="border-b text-left text-slate-500">
                    <th className="pb-2 font-medium"> </th>
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 text-right font-medium"> </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="py-3">
                        <Avatar src={user.avatar} alt={user.first_name} />
                      </td>
                      <td className="py-3">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="py-3 text-slate-600">{user.email}</td>
                      <td className="py-3 text-slate-500">{user.id}</td>
                      <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedUser(user)}>
                          View
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => setEditingUser(user)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded border border-slate-100 p-3"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.first_name} />
                    <div className="min-w-0">
                      <p className="font-medium">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="truncate text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
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

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>
                Page {page} / {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>
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
