import { z } from "zod";

export const createvirtualAccountSchema = z.object({
  first_name: z
    .string({ required_error: "First Name is required" })
    .min(1, "First Name is required"),
  last_name: z
    .string({ required_error: "Last Name is required" })
    .min(1, "Last Name is required"),
  email: z.string().email(),
  phone: z
    .string({ required_error: "First Name is required" })
    .min(1, "First Name is required"),
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits")
    .max(10, "Account number must be at most 10 digits"),
  selectedBank: z
    .string({ required_error: "Bank is required" })
    .refine((val) => val !== "default", "Please select a valid bank"),
});

export type TcreatevirtualAccountSchema = z.infer<
  typeof createvirtualAccountSchema
>;
