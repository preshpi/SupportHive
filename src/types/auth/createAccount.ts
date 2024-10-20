import { z } from "zod";

export const createAccountSchema = z
  .object({
    firstname: z
      .string({ required_error: "First Name is required" })
      .min(1, "First Name is required"),
    lastname: z
      .string({ required_error: "Last Name is required" })
      .min(1, "Last Name is required"),
    gender: z.enum(["Male", "Female", "Other"], {
      required_error: "Gender is required",
    }),
    email: z.string().email(),
    terms: z
      .boolean({ required_error: "Terms and Conditions is required" })
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions",
      }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TcreateAccountSchema = z.infer<typeof createAccountSchema>;
