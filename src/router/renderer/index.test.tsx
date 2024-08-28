import { AuthProvider } from "@context/AuthProvider";
import { cleanup, render, screen } from "@test/utils";
import { BrowserRouter } from "react-router-dom";
import { Renderer } from ".";

const serverMock = vi.hoisted(() => {
  return {
    isAuthenticated: vi.fn(),
    login: vi.fn(),
  };
});

beforeAll(() => {
  vi.mock("@services/api/login", () => {
    return {
      isAuthenticated: serverMock.isAuthenticated,
      login: serverMock.login,
    };
  });
});

afterAll(async () => {
  vi.restoreAllMocks();
  cleanup();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Renderer Routes Tests", () => {
  it("Renderer renders correctly with authentication", async () => {
    serverMock.isAuthenticated.mockImplementation(() => true);

    render(
      <BrowserRouter>
        <AuthProvider>
          <Renderer />
        </AuthProvider>
      </BrowserRouter>,
    );

    const homeElement = screen.getByText(/Que tal adicionar um novo produto/);
    expect(homeElement).toBeInTheDocument();
  });
});
