import { z } from "zod";

export const donationSchema = z.object({
  amount: z.any({ required_error: "Amount is required" }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
});

export type TDonationSchema = z.infer<typeof donationSchema>;

export type donateSchema = {
  amount: any;
  email: string;
  subAccountId: string;
  userId: string;
};
