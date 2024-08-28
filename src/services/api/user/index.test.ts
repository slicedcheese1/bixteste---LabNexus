import { createUser, editUserProduct, getProductsByUserId } from ".";
import { client } from "../instance";

vi.mock("../instance");

describe("User service test", () => {
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

  const axiosCreateUser = vi.hoisted(() => {
    return {
      create: vi.fn(() => ({
        post: vi.fn(),
      })),
    };
  });

  vi.mock("axios", () => {
    return {
      default: axiosMock,
      post: axiosCreateUser,
    };
  });

  const serverMock = vi.hoisted(() => {
    return {
      editUserProduct: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should create a new user", async () => {
    vi.spyOn(client, "createUser").mockReturnThis();

    await createUser({ name: "Nome usuário", email: "email@email.com", password: "123456" });

    expect(client.createUser).toHaveBeenCalledWith({
      email: "email@email.com",
      name: "Nome usuário",
      password: "123456",
    });
  });

  it("should edit a product", async () => {
    vi.spyOn(client, "editProduct").mockReturnThis();

    await editUserProduct({ name: "Nome Produto", price: "200", quantity: "16" }, "2");

    expect(client.editProduct).toHaveBeenCalledWith(
      {
        name: "Nome Produto",
        price: "200",
        quantity: "16",
      },
      "2",
    );
  });

  it("should validate product edition", async () => {
    serverMock.editUserProduct.mockImplementation(() => false);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => null as never);

    serverMock.editUserProduct.mockRejectedValueOnce(new Error("Some error"));

    await editUserProduct(
      {
        name: "Nome Produto",
        price: "200",
        quantity: "16",
      },
      "some-uuid",
    );

    expect(consoleSpy).toHaveBeenCalledTimes(0);
  });

  it("should handle errors", async () => {
    const userId = "123";
    const errorMessage = "";
    (client.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getProductsByUserId(userId)).rejects.toThrow(errorMessage);

    expect(client.get).toHaveBeenCalledWith(`products?userId=${userId}`);
  });
});
