import { StackContext, Api, Config, use } from "sst/constructs";
import { Secret } from "./Secrets";

export function API({ stack }: StackContext) {
  const secret = use(Secret);
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        timeout: 30,
      },
    },

    routes: {
      "POST /login": "packages/functions/src/login.handler",
      "POST /register": "packages/functions/src/register.handler",
      "GET /logout": "packages/functions/src/logout.handler",
      "GET /user-info": "packages/functions/src/user-info.handler",
    },
  });

  new Config.Parameter(stack, "APP_URL", {
    value: api.url,
  });
  api.bind([
    secret.DATABASE_URL,
    secret.JWT_SECRET,
    secret.REDIS_URL,
    secret.REDIS_TOKEN,
  ]);
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
