import { render, screen } from "@test/utils";
import { NotFound } from "./notFound";

describe("Initial registration test", () => {
  it("Shound render screen", () => {
    render(<NotFound />);

    const screenElement = screen.getByText(/404... página não encontrada/);
    expect(screenElement).toBeInTheDocument();
  });
});
