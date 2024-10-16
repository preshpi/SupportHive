import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(10, "Password must be at least 8 characters"),
});

export type TLogin = z.infer<typeof LoginSchema>;
