import { createResponse } from "@auth-test/core/utils/response";
import { ApiHandler } from "sst/node/api";

import { deleteJWT, verifyJWT } from "@auth-test/core/utils/jwt-related";

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

    //
    const numberOfTokenDeleted = await deleteJWT(authToken);
    if (numberOfTokenDeleted == 0) {
      return createResponse(200, { message: "Already Logout" });
    }
    return createResponse(200, { message: "Successfully Logout" });
  } catch (err) {
    console.log(err);
    return createResponse(500, { message: "Internal Server Error" });
  }
});
