import { IGetUser, ILogin } from "@interfaces/index";
import { storage } from "@services/api/storage";
import { sign } from "jsonwebtoken";
import { client } from "../instance";

export async function login(payload: ILogin) {
  try {
    await client.get("/users").then(result => {
      result.data.map((user: IGetUser) => {
        if (user.email === payload.email) {
          if (user.password === payload.password) {
            const token = sign(user, "secret", { expiresIn: "7d" });
            storage.setToken(token);
            storage.setUserName(user.name);
            storage.setUserId(user.id);
            return true;
          }
        }
      });
    });
  } catch (error) {
    return false;
  }
}

export function logout() {
  try {
    storage.removeToken();
    return true;
  } catch (error) {
    return false;
  }
}

export function isAuthenticated() {
  return storage.hasToken();
}
