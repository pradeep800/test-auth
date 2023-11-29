import { redis } from "../redis";

export const isKeyRateLimited = async (key: string) => {
  const request = await redis.incr(key);
  if (request === 1) {
    await redis.expire(key, 60);
  }
  if (request > 20) {
    return true;
  }
  return false;
};
