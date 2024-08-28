import { login } from "@services/api/login";
import { client } from "./instance";
import { storage } from "./storage";

describe("Server Api Test", () => {
  const useMock = vi.hoisted(() => vi.fn());
  const axiosMock = vi.hoisted(() => {
    return {
      create: vi.fn(() => ({
        get: vi.fn(),
        interceptors: {
          request: {
            use: useMock,
          },
        },
      })),
    };
  });

  const axiosLoginMock = vi.hoisted(() => {
    return {
      create: vi.fn(() => ({
        post: vi.fn(),
      })),
    };
  });

  vi.mock("axios", () => {
    return {
      default: axiosMock,
      post: axiosLoginMock,
    };
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should be call get method", async () => {
    await client.get("/some-endpoint");

    expect(axiosMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "http://localhost:3000",
      }),
    );
  });

  it("should be call login post method", async () => {
    await login({ email: "email@email.com", password: "senha123" });

    expect(axiosMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "http://localhost:3000",
      }),
    );
  });

  it("should be call with axios request interceptor", async () => {
    vi.spyOn(storage, "getToken").mockReturnValue("some-token");

    const headerInterceptorMock = useMock.mock.calls[0][0];
    const { headers } = headerInterceptorMock({ headers: {} });

    expect(headers).toStrictEqual({ Authorization: "Bearer some-token" });
  });
});
