import { z } from "zod";

export const userFormSchema = z.object({
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email"),
  role: z.enum(["admin", "editor", "member"]),
  status: z.enum(["active", "inactive"]),
});
