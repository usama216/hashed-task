"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { UserFormFields } from "./UserFormFields";
import { userFormSchema } from "./schema";
import { useCreateUser } from "@/hooks/useUserMutations";
import type { UserFormData } from "@/types";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddUserModal({ open, onClose }: AddUserModalProps) {
  const createUser = useCreateUser();

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

  const close = () => {
    methods.reset();
    onClose();
  };

  const onSubmit = async (values: UserFormData) => {
    await createUser.mutateAsync(values);
    methods.reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={close} title="Add user">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <UserFormFields />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" loading={createUser.isPending}>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
