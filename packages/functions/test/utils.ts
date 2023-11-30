import { Config } from "sst/node/config";
import { v4 as uuidv4 } from "uuid";
//if you are running this in locally with live server uncomment down below line and comment line number 6 (pnpm run test)
const url = Config.APP_URL;
// if you are running deployed code uncomment down below line and comment line 4(pnpm run deploy-test)
// const url = "https://xxp5iu4cw1.execute-api.us-east-1.amazonaws.com";
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
  const { email, name, password, userName } = createRandomUser();
  const { data } = await Register({ email, password, name, userName });
  const { token } = data as { token: string };
  return token;
}
export function createRandomUser() {
  const name = uuidv4();
  const email = name + "@gmail.com";
  const userName = uuidv4().slice(0, 25);
  const password = name.slice(0, 12) + "#2";
  return { name, email, userName, password };
}
export function getExistingUser() {
  const userName = "a4913597-942c-4d10-840b-f";
  const name = "name can be same";
  const email = "07dd1709-c160-4572-8a60-3e9ff0be4264@gmail.com";
  const password = "07dd1709-c16#2";
  return { userName, name, email, password };
}
