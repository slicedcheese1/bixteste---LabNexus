import { act, fireEvent, render, screen, waitFor } from "@test/utils";
import { Login } from "./login";
import { login } from "@services/api/login";
import { ILogin } from "@interfaces/index";

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const serverMock = vi.hoisted(() => {
  return {
    login: vi.fn(),
  };
});

beforeAll(() => {
  vi.mock("@services/api/login", () => {
    return {
      login: serverMock.login,
    };
  });
});

afterEach(async () => {
  vi.clearAllMocks();
});

afterAll(async () => {
  vi.restoreAllMocks();
});

describe("Login Page Test", () => {
  it("Should be able to render", () => {
    const { container } = render(<Login />);
    const title = screen.getAllByText("Login")[0];
    const submitButton = screen.getAllByText("Login")[1];
    const registerButton = screen.getByText("Cadastro");
    const inputElements = container.querySelectorAll("input[type=text]");

    expect(title).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(inputElements).toHaveLength(2);
  });

  it("should redirect to home page after login be correct", async () => {
    const { getByLabelText, container, getByText } = render(<Login />);

    serverMock.login.mockImplementation(() => false);

    const user: ILogin = {
      email: "email@email.com",
      password: "senha123",
    };

    const usernameInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Senha");
    const submitButton = container.querySelector("button[type=submit]") as HTMLButtonElement;

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(login(user)).toBeFalsy();
    expect(serverMock.login).toHaveBeenCalledWith(user);
    waitFor(() => {
      expect(getByText("Credenciais inválidas."));
    });

    serverMock.login.mockImplementation(() => true);

    act(() => {
      fireEvent.change(usernameInput, { target: { name: "user", value: "email@email.com" } });
      fireEvent.change(passwordInput, { target: { name: "pass", value: "senha123" } });
      fireEvent.click(submitButton);
    });

    expect(login(user)).toBeTruthy();
    expect(serverMock.login).toHaveBeenCalledWith(user);
    expect(window.location.href).toBe("http://localhost:3000/");
  });
});
