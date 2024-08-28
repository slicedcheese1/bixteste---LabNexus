import { storage } from "./storage";

describe("Storage test", () => {
  it("should add the token to localStorage", () => {
    const token = "myTestToken";
    storage.setToken(token);

    expect(storage.hasToken()).toBeTruthy();
  });

  it("should return true when a token is set", () => {
    const token = "myTestToken";
    storage.setToken(token);

    expect(storage.hasToken()).toBeTruthy();
  });

  it("should return the token", () => {
    const token = "myTestToken";
    storage.setToken(token);

    expect(storage.getToken()).toEqual("myTestToken");
  });

  it("should remove the token to localStorage", () => {
    storage.removeToken();

    expect(storage.hasToken()).not.toBeTruthy();
  });
});
