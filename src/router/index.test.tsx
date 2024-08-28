import { render } from "@test/utils";
import Router from ".";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  redirect: vi.fn(),
  useNavigate: vi.fn(),
  RouterProvider: vi.fn(),
  createBrowserRouter: vi.fn(),
  BrowserRouter: vi.fn(),
}));

const serverMock = vi.hoisted(() => {
  return {
    isAuthenticated: vi.fn(),
  };
});

beforeAll(() => {
  vi.mock("@pages/Login/loginService", () => {
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

describe("Router Component Test", () => {
  it("renders correctly", () => {
    render(<Router />);
  });
});
