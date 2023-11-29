import { expect, it, describe } from "vitest";

import { v4 as uuidv4 } from "uuid";
import { Logout, Sigin } from "./utils";
const tenSecond = 10000;
describe(
  "Test Signin Api",
  async () => {
    it(
      "Successfully created account",
      async () => {
        const name = uuidv4();
        const email = name + "@gmail.com";
        const password = name.slice(0, 12) + "#2";
        const { res, data } = await Sigin({ email, password, name });
        expect(res).to.have.property("status").eq(200);

        expect(data).to.have.property("token").that.is.a("string");
      },
      tenSecond
    );

    it("Weak password", async () => {
      const name = "pradeep";
      const email = "pradeep@gmail.com";
      const password = "weakpassword";
      const { res, data } = await Sigin({ email, password, name });
      expect(res).to.have.property("status").eq(400);
      expect(data).to.have.property("message").contain("Weak Password");
    });

    it("Weak password", async () => {
      const name = "pradeep";
      const email = "0e1977cb204a@gmail.com";
      const password = "password*3*";
      const { res, data } = await Sigin({ email, password, name });
      expect(res).to.have.property("status").eq(409);
      expect(data).to.have.property("message").eq("Mail Already In Use");
    });
  },
  tenSecond
);
