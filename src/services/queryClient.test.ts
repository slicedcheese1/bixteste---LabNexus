import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

describe("queryClient test", () => {
  it("must create an instance of QueryClient", () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
