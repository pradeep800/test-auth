import { expect, it, describe } from "vitest";

import { Register, createRandomUser, getExistingUser } from "./utils";
const twentySeconds = 20000;
describe("Test /register endpoint", async () => {
  it(
    "Successfully created account",
    async () => {
      const { email, name, password, userName } = createRandomUser();
      const { res, data } = await Register({
        email,
        password,
        name,
        userName,
      });

      expect(res).to.have.property("status").eq(200);

      expect(data).to.have.property("token").that.is.a("string");
    },
    twentySeconds
  );

  it(
    "Weak password",
    async () => {
      let { email, name, userName } = createRandomUser();
      const password = "weakpassword";

      const { res, data } = await Register({ email, password, name, userName });

      expect(res).to.have.property("status").eq(400);
      expect(data).to.have.property("message").contain("Weak Password");
    },
    twentySeconds
  );

  describe("Mail or userName already in use ", async () => {
    it(
      "mail",
      async () => {
        const { email, name, password } = getExistingUser();
        const userName = "newUserName";
        const { res, data } = await Register({
          email,
          password,
          name,
          userName,
        });
        expect(res).to.have.property("status").eq(409);
        expect(data)
          .to.have.property("message")
          .eq("Mail Or Username Already In Use");
      },
      twentySeconds
    );
    it(
      "userName",
      async () => {
        const { name, password, userName } = getExistingUser();
        const email = "newEmail@gmail.com";
        const { res, data } = await Register({
          email,
          password,
          name,
          userName,
        });

        expect(res).to.have.property("status").eq(409);
        expect(data)
          .to.have.property("message")
          .eq("Mail Or Username Already In Use");
      },
      twentySeconds
    );
  });
});
