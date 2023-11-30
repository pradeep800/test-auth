import { eq, or } from "drizzle-orm";
import { db } from "../db/db";
import { users } from "../db/schema";
import { z } from "zod";
import { userInfoSchema } from "../zodSchema/user-info-schema";

export const getUser = async (email: string) => {
  const userInfo = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return userInfo[0];
};

export const checkUserExits = async (email: string, userName: string) => {
  const userInfo = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
    })
    .from(users)
    .where(or(eq(users.email, email), eq(users.userName, userName)))
    .limit(1);
  return userInfo.length !== 0;
};
type UserInfo = z.infer<typeof userInfoSchema>;

export const createUser = async (userInfo: UserInfo) => {
  const dbUserInfo = await db
    .insert(users)
    .values(userInfo)
    .returning({ id: users.id });
  const userId = dbUserInfo[0];
  if (!userId) {
    throw new Error("User id is not present");
  }
  return userId.id;
};

export const getUserInfo = async (id: string) => {
  const userInfo = await db
    .select({ id: users.id, email: users.email, name: users.name })
    .from(users)
    .where(eq(users.id, id));
  return userInfo[0];
};
