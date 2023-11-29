import { it, describe, expect } from "vitest";
import { Login, ProtectedRoute } from "./utils";
const twentySecond = 20000;
describe("Test Protect route api", () => {
  it(
    "Get user info",
    async () => {
      const email = "27ef7f08-3@gmail.com";
      const password = "27ef7f08-3#2";
      const { data: logInData } = await Login({ email, password });
      const { token } = logInData as { token: string };
      const { data, res } = await ProtectedRoute(token);
      expect(res).to.have.property("status").eq(200);
      expect(data).to.have.property("email").that.is.a("string");
      expect(data).to.have.property("name").that.is.a("string");
      expect(data).to.have.property("id").that.is.a("string");
    },
    twentySecond
  );
  it(
    "Rate limited",
    async () => {
      const email = "27ef7f08-3@gmail.com";
      const password = "27ef7f08-3#2";
      const { data: logInData } = await Login({ email, password });
      const { token } = logInData as { token: string };
      let promises: ReturnType<typeof ProtectedRoute>[] = [];
      for (let i = 0; i < 25; i++) {
        promises.push(ProtectedRoute(token));
      }
      const allRes = await Promise.all(promises);
      const isRateLimited = allRes.some((data) => {
        let { message } = data.data as { message: string };
        return message === "Rate Limited";
      });
      if (isRateLimited) {
        expect.fail("rate limitation is not working");
      }
      expect(1).eq(1);
    },
    twentySecond
  );
});
