import { z } from "zod";

export const jwtSchema = z.object({
  email: z.string().email(),
  id: z.string(),
  name: z.string(),
});
