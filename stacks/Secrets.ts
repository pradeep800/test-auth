import { Config, StackContext } from "sst/constructs";
export function Secret(ctx: StackContext) {
  return {
    DATABASE_URL: new Config.Parameter(ctx.stack, "DATABASE_URL", {
      value: process.env.DATABASE_URL as string,
    }),
    REDIS_URL: new Config.Parameter(ctx.stack, "REDIS_URL", {
      value: process.env.REDIS_URL as string,
    }),
    REDIS_TOKEN: new Config.Parameter(ctx.stack, "REDIS_TOKEN", {
      value: process.env.REDIS_TOKEN as string,
    }),
    JWT_SECRET: new Config.Parameter(ctx.stack, "JWT_SECRET", {
      value: process.env.JWT_SECRET as string,
    }),
  };
}
