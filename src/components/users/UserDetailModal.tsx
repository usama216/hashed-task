"use client";

import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton";
import { useGetUserByIdQuery } from "@/store/api/usersApi";
import type { User } from "@/types";

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const { data, isLoading } = useGetUserByIdQuery(user?.id ?? 0, { skip: !user });
  const info = data ?? user;

  return (
    <Modal open={Boolean(user)} onClose={onClose} title="User details" size="lg">
      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      )}

      {!isLoading && info && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar src={info.avatar} alt={info.first_name} size="lg" />
            <div>
              <p className="font-medium">
                {info.first_name} {info.last_name}
              </p>
              <p className="text-sm text-slate-500">{info.email}</p>
            </div>
          </div>

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <p>
              <span className="text-slate-500">ID: </span>
              {info.id}
            </p>
            <p>
              <span className="text-slate-500">Email: </span>
              {info.email}
            </p>
            <p>
              <span className="text-slate-500">First name: </span>
              {info.first_name}
            </p>
            <p>
              <span className="text-slate-500">Last name: </span>
              {info.last_name}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
