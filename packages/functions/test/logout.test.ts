import { expect, it, describe } from "vitest";
import { Login, ProtectedRoute, getExistingUser } from "./utils";
import { Logout } from "./utils";

const twentySeconds = 20000;
describe("Test /logout endpoint", () => {
  it(
    "Successfully logout",
    async () => {
      const { email, password } = getExistingUser();
      const { data: logInData } = await Login({ email, password });
      const { token } = logInData as { token: string };

      const { res, data: logoutData } = await Logout(token);
      expect(res).to.have.property("status").eq(200);
      expect(logoutData).to.have.property("message").eq("Successfully Logout");
    },
    twentySeconds
  );

  it(
    "Wrong authentication Token",
    async () => {
      const { res, data: logoutData } = await Logout("wrongtoken");
      expect(res).to.have.property("status").eq(401);
      expect(logoutData).to.have.property("message").eq("Unauthorized");
    },
    twentySeconds
  );

  it(
    "After logout cannot use token",
    async () => {
      const { email, password } = getExistingUser();
      const { data: logInData } = await Login({ email, password });
      const { token } = logInData as { token: string };

      await Logout(token);
      const { data, res } = await ProtectedRoute(token);
      expect(res).to.have.property("status").eq(401);
      expect(data).to.have.property("message").eq("Unauthorized");
    },
    twentySeconds
  );
});
