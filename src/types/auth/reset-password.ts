import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TResetPassword = z.infer<typeof ResetPasswordSchema>;
