import jwt, { JwtPayload } from "jsonwebtoken";
import { Config } from "sst/node/config";
import { db } from "../db/db";
import { verificationToken } from "../db/schema";
import { jwtSchema } from "../zodSchema/jwt-schema";
import { eq } from "drizzle-orm";

export const createJwt = async (
  payload: Record<string, string>,
  expiresIn: string
) => {
  if (payload.id) {
    const sessionToken = jwt.sign(payload, Config.JWT_SECRET, {
      expiresIn: expiresIn,
    });

    await db
      .insert(verificationToken)
      .values({ token: sessionToken, userId: payload.id });

    return sessionToken;
  }
  throw new Error("Id is not present");
};
export const verifyJWT = (authToken: string) => {
  let payload: JwtPayload | string;

  try {
    payload = jwt.verify(authToken, Config.JWT_SECRET);
    const userinfo = jwtSchema.parse(payload);
    return userinfo;
  } catch (err) {
    return "error" as const;
  }
};

export const deleteJWT = async (authToken: string) => {
  const number = (
    await db
      .delete(verificationToken)
      .where(eq(verificationToken.token, authToken))
  ).count;
  return number;
};
