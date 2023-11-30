import { expect, it, describe } from "vitest";

import { Login, getExistingUser } from "./utils";
const twentySeconds = 20000;
describe("Test /login endpoint", () => {
  it(
    "Successfully login",
    async () => {
      const { email, password } = getExistingUser();
      const { res, data } = await Login({ email, password });

      expect(res).to.have.property("status").eq(200);
      expect(data).to.have.property("token").that.is.a("string");
    },
    twentySeconds
  );

  it(
    "Missing request body",
    async () => {
      const { email } = getExistingUser();
      const { data, res } = await Login({ email });

      expect(res).to.have.property("status").eq(400);
      expect(data).to.have.property("message").eq("Missing Request Body");
    },
    twentySeconds
  );

  it(
    "Wrong password",
    async () => {
      const { email } = getExistingUser();
      const password = "wrong password";
      const { data, res } = await Login({ email, password });

      expect(res).to.have.property("status").eq(401);
      expect(data).to.have.property("message").eq("Wrong Password");
    },
    twentySeconds
  );
});
