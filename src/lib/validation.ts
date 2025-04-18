import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  username: z.string().min(3).max(20),
});

export const transactionSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(3).max(20),
});
