import { storage } from "@services/api/storage";
import { isAuthenticated, logout } from ".";

describe("Login Service Test", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should be check user is Authenticated ", () => {
    localStorage.setItem("token", "some-token");

    const hasToken = isAuthenticated();

    expect(hasToken).toBeTruthy();
  });

  it("should be call logout", async () => {
    vi.spyOn(Storage.prototype, "removeItem");
    const isLogoff = logout();

    expect(isLogoff).toBeTruthy();
    expect(localStorage.removeItem).toHaveBeenCalledTimes(3);
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
  });

  it("should be call logout with error", async () => {
    vi.spyOn(storage, "removeToken").mockImplementation(() => {
      throw new Error("Some Error");
    });

    const isLogoff = logout();
    expect(isLogoff).toBeFalsy();
  });
});
