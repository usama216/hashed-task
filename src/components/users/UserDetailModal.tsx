"use client";

import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { useGetUserByIdQuery } from "@/store/api/usersApi";
import type { User, UserRole, UserStatus } from "@/types";

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

function statusVariant(status?: UserStatus) {
  return status === "active" ? "active" : "inactive";
}

function roleVariant(role?: UserRole) {
  if (role === "admin") return "admin";
  if (role === "editor") return "editor";
  return "member";
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-50 py-3 last:border-0">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</span>
      <span className="text-sm text-brand-dark">{value}</span>
    </div>
  );
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const { data, isLoading } = useGetUserByIdQuery(user?.id ?? 0, { skip: !user });
  const info = data && user
    ? { ...data, role: user.role, status: user.status }
    : user ?? data;

  return (
    <Modal open={Boolean(user)} onClose={onClose} title="User details" size="lg">
      {isLoading && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      )}

      {!isLoading && info && (
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar src={info.avatar} alt={info.first_name} size="lg" />
            <div>
              <p className="text-base font-semibold tracking-tight text-brand-dark">
                {info.first_name} {info.last_name}
              </p>
              <p className="mt-0.5 text-sm text-zinc-500">{info.email}</p>
              <div className="mt-2.5 flex gap-1.5">
                <Badge variant={roleVariant(info.role)}>{info.role ?? "member"}</Badge>
                <Badge variant={statusVariant(info.status)} dot>
                  {info.status ?? "active"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-brand-light/50 px-4">
            <DetailRow label="ID" value={`#${info.id}`} />
            <DetailRow label="First name" value={info.first_name} />
            <DetailRow label="Last name" value={info.last_name} />
            <DetailRow label="Email" value={info.email} />
          </div>
        </div>
      )}
    </Modal>
  );
}
