"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { UserFormData } from "@/types";

export function UserFormFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserFormData>();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          error={errors.first_name?.message}
          {...register("first_name")}
        />
        <Input
          label="Last Name"
          error={errors.last_name?.message}
          {...register("last_name")}
        />
      </div>

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Role" error={errors.role?.message} {...register("role")}>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="member">Member</option>
        </Select>

        <Select label="Status" error={errors.status?.message} {...register("status")}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </div>
    </div>
  );
}
