import { IInitialRegistration } from "@interfaces/index";
import { client } from "../instance";

export async function createUser(payload: IInitialRegistration) {
  try {
    await client.createUser(payload);
  } catch (error) {
    return false;
  }
}
