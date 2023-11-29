import { expect, it, describe } from "vitest";

import { Config } from "sst/node/config";
import { v4 as uuidv4 } from "uuid";
import { Login } from "./utils";

describe("Test Login Api", () => {
  it("Successfully login", async () => {
    const email = "27ef7f08-3@gmail.com";
    const password = "27ef7f08-3#2";
    const { res, data } = await Login({ email, password });
    expect(res).to.have.property("status").eq(200);
    expect(data).to.have.property("token").that.is.a("string");
  }, 20000);

  it("Missing request body", async () => {
    const email = "0e1977cb204a@gmail.com";
    const { data, res } = await Login({ email });

    expect(res).to.have.property("status").eq(400);
    expect(data).to.have.property("message").eq("Missing Request Body");
  }, 10000);

  it("Wrong password", async () => {
    const email = "0f2c3430-fcdc-4ef4-8328-7e1977cb204a@gmail.com";
    const password = "wrongpassword";
    const { data, res } = await Login({ email, password });
    expect(res).to.have.property("status").eq(401);
    expect(data).to.have.property("message").eq("Wrong Password");
  }, 10000);
});
