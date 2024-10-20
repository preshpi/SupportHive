import { z } from "zod";

export const updateProfileSchema = z.object({
  firstname: z
    .string({ required_error: "First Name is required" })
    .min(1, "First Name is required"),
  lastname: z
    .string({ required_error: "Last Name is required" })
    .min(1, "Last Name is required"),

  email: z.string().email(),
});

export type TupdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const securitySchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Current password is required" })
      .min(1, "Current password is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TsecuritySchema = z.infer<typeof securitySchema>;
