import { Config, StackContext } from "sst/constructs";
export function Secret(ctx: StackContext) {
  return {
    DATABASE_URL: new Config.Secret(ctx.stack, "DATABASE_URL"),
    REDIS_URL: new Config.Secret(ctx.stack, "REDIS_URL"),
    REDIS_TOKEN: new Config.Secret(ctx.stack, "REDIS_TOKEN"),
    JWT_SECRET: new Config.Secret(ctx.stack, "JWT_SECRET"),
  };
}
