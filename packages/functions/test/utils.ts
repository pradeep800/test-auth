import { Config } from "sst/node/config";
import { v4 as uuidv4 } from "uuid";

const url =
  Config.APP_URL ?? "https://xxp5iu4cw1.execute-api.us-east-1.amazonaws.com";
export async function Register(userInfo: Record<string, string>) {
  const res = await fetch(url + "/register", {
    method: "POST",
    body: JSON.stringify({ ...userInfo }),
  });
  const data = await res.json();
  return { res, data };
}
export async function Logout(token: string) {
  const res = await fetch(url + "/logout", {
    headers: { Authorization: "Bearer " + token },
  });
  const data = await res.json();
  return { res, data };
}
export async function Login(userInfo: Record<string, string>) {
  const res = await fetch(url + "/login", {
    method: "POST",
    body: JSON.stringify({ ...userInfo }),
  });
  const data = await res.json();

  return { res, data };
}
export async function ProtectedRoute(token: string) {
  const res = await fetch(url + "/protected-route", {
    headers: { Authorization: "Bearer " + token },
  });
  const data = await res.json();
  return { res, data };
}
export async function createUserGetToken() {
  const name = uuidv4();
  const email = name + "@gmail.com";
  const password = name.slice(0, 12) + "#2";
  const { data } = await Register({ email, password, name });
  const { token } = data as { token: string };
  return token;
}
