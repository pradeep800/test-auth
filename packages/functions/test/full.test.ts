import { expect, it } from "vitest";
import {
  Login,
  Logout,
  ProtectedRoute,
  Register,
  createRandomUser,
} from "./utils";
const thirtySeconds = 30000;
it(
  "Full authentication flow",
  async () => {
    //create user
    const { email, password, userName, name } = createRandomUser();
    const { res: signInResponse, data: signInData } = await Register({
      email,
      password,
      name,
      userName,
    });
    expect(signInResponse).to.have.property("status").eq(200);
    expect(signInData).to.have.property("token").that.is.a("string");

    //User Login
    const { res: loginResponse, data: loginData } = await Login({
      email,
      password,
    });
    expect(loginResponse).to.have.property("status").eq(200);
    expect(loginData).to.have.property("token").that.is.a("string");

    //Get user info from protected route
    const { token } = loginData as { token: string };
    const { data: protectedRouteData, res: protectedRouteResponse } =
      await ProtectedRoute(token);
    expect(protectedRouteResponse).to.have.property("status").eq(200);
    expect(protectedRouteData).to.have.property("email").that.is.a("string");
    expect(protectedRouteData).to.have.property("name").that.is.a("string");
    expect(protectedRouteData).to.have.property("id").that.is.a("string");
    expect(protectedRouteData).to.have.property("userName").that.is.a("string");

    //Logout from account
    const { data: logoutData, res: logoutResponse } = await Logout(token);
    expect(logoutResponse).to.have.property("status").eq(200);
    expect(logoutData).to.have.property("message").eq("Successfully Logout");
  },
  thirtySeconds
);
