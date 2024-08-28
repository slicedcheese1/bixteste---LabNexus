import { BrowserRouter } from "react-router-dom";
import { RouteTypeRenderer } from ".";
import { render } from "@test/utils";
import { Home } from "@pages/Home/home";

describe("RouteTypeRenderer Component Tests", () => {
  it("renders routes correctly", () => {
    const routes = [
      {
        path: "/",
        element: (
          <div>
            <h1>Main Element</h1>
          </div>
        ),
        errorElement: <div>Error Element</div>,
        children: [
          { path: "/", element: <Home /> },
          { path: "/home", element: <Home /> },
        ],
      },
    ];

    const { getByText } = render(
      <BrowserRouter>
        <RouteTypeRenderer routes={routes} />
      </BrowserRouter>,
    );

    expect(getByText("Main Element")).toBeInTheDocument();
  });
});
