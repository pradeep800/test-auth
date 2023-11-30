import { ApiHandler } from "sst/node/api";
import { userInfoSchema } from "../../core/src/zodSchema/user-info-schema";
import { createResponse } from "@auth-test/core/utils/response";
import { strongPasswordSchema } from "../../core/src/zodSchema/strong-pass-schema";
import { checkUserExits, createUser } from "@auth-test/core/utils/user-related";
import { createJwt } from "@auth-test/core/utils/jwt-related";
import bcrypt from "bcryptjs";
export const handler = ApiHandler(async (event) => {
  try {
    const { body } = event;
    const parseBody = JSON.parse(body as string);
    const userInfo = userInfoSchema.safeParse(parseBody);

    if (!userInfo.success) {
      return createResponse(400, { message: "Missing Request Body" });
    }

    const isStrongPass = strongPasswordSchema.safeParse(
      userInfo.data.password
    ).success;

    if (!isStrongPass) {
      return createResponse(400, {
        message:
          "Weak Password (hint:password should be 8-15 character long and it should at least contain one special character(@#$%^&*) and one number)",
      });
    }

    const userExits = await checkUserExits(
      userInfo.data.email,
      userInfo.data.userName
    );

    if (userExits) {
      return createResponse(409, {
        message: "Mail Or Username Already In Use",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(userInfo.data.password, salt);
    const userId = await createUser({ ...userInfo.data, password: hashPass });

    const token = await createJwt(
      {
        id: userId,
        email: userInfo.data.email,
        userName: userInfo.data.userName,
      },
      "7d"
    );
    return createResponse(200, { token: token });
  } catch (err) {
    console.log(err);

    return createResponse(500, { message: "Internal Server Error" });
  }
});
