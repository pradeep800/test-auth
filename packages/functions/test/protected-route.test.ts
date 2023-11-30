import { it, describe, expect } from "vitest";
import { Login, ProtectedRoute, Register, createUserGetToken } from "./utils";
const twentySeconds = 20000;
describe("Test Protect route api", () => {
  it(
    "Get user info",
    async () => {
      const token = await createUserGetToken();
      const { data, res } = await ProtectedRoute(token);
      expect(res).to.have.property("status").eq(200);

      expect(data).to.have.property("email").that.is.a("string");
      expect(data).to.have.property("name").that.is.a("string");
      expect(data).to.have.property("id").that.is.a("string");
    },
    twentySeconds
  );

  it("Rate limited", async () => {
    const token = await createUserGetToken();
    let count = 21;
    let interval: NodeJS.Timeout;

    /// making fetch call 21 times and the limit of api is 20 per minute so it will start rate limiting it after 20 api calls
    await new Promise((resolve) => {
      interval = setInterval(async () => {
        if (count === 0) {
          clearInterval(interval);
          resolve("");
        }
        const { data, res } = await ProtectedRoute(token);
        const { message } = data as { message: string };
        const { status } = res;
        if (status === 429 && message === "Rate Limited") {
          clearInterval(interval);
          resolve("");
        }
        count--;
      }, 1000);
    });
    if (count === 0) {
      expect.fail("rate limitation is not working");
    } else {
      expect(1).eq(1);
    }
  }, 60000);
});
