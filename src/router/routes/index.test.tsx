import { routes } from ".";

describe("Routes tests", () => {
  it("should have private routes", () => {
    expect(routes.private).toBeDefined();
    expect(Array.isArray(routes.private)).toBe(true);
  });

  it("should have public routes", () => {
    expect(routes.public).toBeDefined();
    expect(Array.isArray(routes.public)).toBe(true);
  });
});
