import { z } from "zod";

export const forgtPasswordSchema = z.object({
  email: z.string().email(),
});

export type TforgotPasswordSchema = z.infer<typeof forgtPasswordSchema>;
