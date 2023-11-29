import { expect, it, describe } from "vitest";
import { Login } from "./utils";
import { Logout } from "./utils";

const tenSecond = 10000;
describe("Test Logout Api", () => {
  it(
    "Successfully logout",
    async () => {
      const email = "27ef7f08-3@gmail.com";
      const password = "27ef7f08-3#2";
      const { data: logInData } = await Login({ email, password });
      const { token } = logInData as { token: string };

      const { res, data: logoutData } = await Logout(token);

      expect(res).to.have.property("status").eq(200);
      expect(logoutData).to.have.property("message").eq("Successfully Logout");
    },
    tenSecond
  );
  it(
    "Wrong authentication Token",
    async () => {
      const { res, data: logoutData } = await Logout("wrongtoken");
      expect(res).to.have.property("status").eq(401);
      expect(logoutData).to.have.property("message").eq("Unauthorized");
    },
    tenSecond
  );
  it(
    "Already logout",
    async () => {
      const email = "27ef7f08-3@gmail.com";
      const password = "27ef7f08-3#2";
      const { data: logInData } = await Login({ email, password });
      const { token } = logInData as { token: string };

      await Logout(token);
      const { res, data } = await Logout(token);
      expect(res).to.have.property("status").eq(200);
      expect(data).to.have.property("message").eq("Already Logout");
    },
    tenSecond
  );
});
