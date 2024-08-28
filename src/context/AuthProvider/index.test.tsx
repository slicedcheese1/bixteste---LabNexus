import { render } from "@test/utils";
import { AuthProvider, useAuth } from ".";

const navigateMock = vi.fn();
const locationMock = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
}));

const serverMock = vi.hoisted(() => {
  return {
    isAuthenticated: vi.fn(),
  };
});

beforeAll(() => {
  vi.mock("@services/api/login", () => {
    return {
      isAuthenticated: serverMock.isAuthenticated,
    };
  });
});

afterEach(async () => {
  vi.clearAllMocks();
});

afterAll(async () => {
  vi.restoreAllMocks();
});

describe("AuthProvider Tests", () => {
  it("Must provide the correct authentication state for child components", () => {
    const TestComponent = () => {
      const { isAuthenticated } = useAuth();
      return <div>{isAuthenticated ? "Autenticado" : "Não autenticado"}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByText("Não autenticado")).toBeTruthy();
  });

  it("Must provide the correct authentication state for child components", async () => {
    serverMock.isAuthenticated.mockImplementation(() => true);
    const TestComponent = () => {
      const { isAuthenticated } = useAuth();
      return <div>{isAuthenticated ? "Autenticado" : "Não autenticado"}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await Promise.resolve();

    expect(getByText("Autenticado")).toBeTruthy();
  });
});
