import { verifyJWT } from "@auth-test/core/utils/jwt-related";
import { createResponse } from "@auth-test/core/utils/response";
import { getUserInfo } from "@auth-test/core/utils/user-related";
import { ApiHandler } from "sst/node/api";
import { isKeyRateLimited } from "@auth-test/core/utils/redis-rate-limiter";
export const handler = ApiHandler(async (event) => {
  try {
    if (
      !("authorization" in event["headers"]) ||
      typeof event["headers"]["authorization"] !== "string"
    ) {
      return createResponse(401, { message: "Unauthorized" });
    }
    const authToken = event["headers"]["authorization"].split(" ")[1] as string;
    //check token info
    let payload = verifyJWT(authToken);
    if (payload === "error") {
      return createResponse(401, { message: "Unauthorized" });
    }

    const isRateLimited = await isKeyRateLimited(payload.email);
    if (isRateLimited) {
      return createResponse(429, { message: "Rate Limited" });
    }
    const userInfo = await getUserInfo(payload.id);
    if (!userInfo) {
      throw new Error("User not found");
    }
    return createResponse(200, userInfo);
  } catch (err) {
    console.log(err);
    return createResponse(501, { message: "Internal Server Error" });
  }
});
