import { Config } from "sst/node/config";
const url = Config.APP_URL;
export async function Sigin(userInfo: Record<string, string>) {
  const res = await fetch(url + "/signin", {
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
