import api from "@services/api";
import { fireEvent, render, screen } from "@test/utils";
import { Home } from "./home";

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Initial Registration Test", () => {
  it("renders welcome message", () => {
    render(<Home />);
    expect(screen.getByText(/Bem vindo/i)).toBeInTheDocument();
  });

  it("navigates to create product page when add product button is clicked", () => {
    render(<Home />);

    fireEvent.click(screen.getByText(/Adicionar produto/i));

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/createProduct");
  });

  it("logs out and navigates to login page when logout button is clicked", async () => {
    vi.spyOn(api.login, "logout").mockResolvedValue(true);

    render(<Home />);

    fireEvent.click(screen.getByText(/Sair/i));

    await screen.findByText(/Bem vindo/i);

    expect(api.login.logout).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
  });

  const getProductsByUserIdMock = vi.hoisted(() =>
    vi.fn().mockReturnValue([
      { id: 1, name: "Product 1", price: "10.00", quantity: "5" },
      { id: 2, name: "Product 2", price: "15.00", quantity: "10" },
    ]),
  );

  vi.mock("@services/api/user", () => ({
    getProductsByUserId: getProductsByUserIdMock,
  }));
});
