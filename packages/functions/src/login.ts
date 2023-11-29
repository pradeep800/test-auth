import { ApiHandler } from "sst/node/api";
import { emailAndPasswordSchema } from "../../core/src/zodSchema/email-and-password";
import { createResponse } from "@auth-test/core/utils/response";
import { getUser } from "../../core/src/utils/user-related";
import bcrypt from "bcryptjs";
import { createJwt } from "@auth-test/core/utils/jwt-related";
export const handler = ApiHandler(async (event) => {
  try {
    const { body } = event;
    const parseBody = JSON.parse(body as string);
    const userInfo = emailAndPasswordSchema.safeParse(parseBody);

    if (!userInfo.success) {
      return createResponse(400, { message: "Missing Request Body" });
    }

    const dbUser = await getUser(userInfo.data.email);

    if (!dbUser) {
      return createResponse(401, { message: "Unauthenticated" });
    }

    const match = await bcrypt.compare(userInfo.data.password, dbUser.password);

    if (!match) {
      return createResponse(401, { message: "Wrong Password" });
    }

    const jwtToken = await createJwt(
      { name: dbUser.name, id: dbUser.id, email: dbUser.email },
      "7d"
    );

    return createResponse(200, { token: jwtToken });
  } catch (err) {
    console.log(err);
    return createResponse(500, { message: "Internal Server Error" });
  }
});
