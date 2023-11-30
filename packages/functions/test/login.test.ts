import { expect, it, describe } from "vitest";

import { Login } from "./utils";
const twentySeconds = 20000;
describe("Test Login Api", () => {
  it(
    "Successfully login",
    async () => {
      const email = "27ef7f08-3@gmail.com";
      const password = "27ef7f08-3#2";
      const { res, data } = await Login({ email, password });
      expect(res).to.have.property("status").eq(200);
      expect(data).to.have.property("token").that.is.a("string");
    },
    twentySeconds
  );

  it(
    "Missing request body",
    async () => {
      const email = "0e1977cb204a@gmail.com";
      const { data, res } = await Login({ email });

      expect(res).to.have.property("status").eq(400);
      expect(data).to.have.property("message").eq("Missing Request Body");
    },
    twentySeconds
  );

  it(
    "Wrong password",
    async () => {
      const email = "0e1977cb204a@gmail.com";
      const password = "wrongpassword";
      const { data, res } = await Login({ email, password });
      expect(res).to.have.property("status").eq(401);
      expect(data).to.have.property("message").eq("Wrong Password");
    },
    twentySeconds
  );
});
