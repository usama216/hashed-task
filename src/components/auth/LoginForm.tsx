"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { useLogin } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const { loginUser, isLoading } = useLogin();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setError("");
    try {
      await loginUser(values);
    } catch (err) {
      setError(getErrorMessage(err as Parameters<typeof getErrorMessage>[0]));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" className="w-full" loading={isLoading}>
        Login
      </Button>
    </form>
  );
}
