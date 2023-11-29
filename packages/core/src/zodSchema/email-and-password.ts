import { z } from "zod";

export const emailAndPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
