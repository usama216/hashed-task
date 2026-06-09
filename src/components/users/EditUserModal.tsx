"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { UserFormFields } from "./UserFormFields";
import { userFormSchema } from "./schema";
import { useUpdateUser } from "@/hooks/useUserMutations";
import type { User, UserFormData } from "@/types";

interface EditUserModalProps {
  user: User | null;
  onClose: () => void;
}

export function EditUserModal({ user, onClose }: EditUserModalProps) {
  const updateUser = useUpdateUser();

  const methods = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "member",
      status: "active",
    },
  });

  useEffect(() => {
    if (!user) return;
    methods.reset({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role ?? "member",
      status: user.status ?? "active",
    });
  }, [user, methods]);

  const onSubmit = async (values: UserFormData) => {
    if (!user) return;
    await updateUser.mutateAsync({ id: user.id, payload: values });
    onClose();
  };

  return (
    <Modal open={Boolean(user)} onClose={onClose} title="Edit user">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <UserFormFields />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={updateUser.isPending}>
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
