import { z } from "zod";

export const userInfoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
