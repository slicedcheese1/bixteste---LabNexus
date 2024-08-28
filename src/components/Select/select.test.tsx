import { Select } from ".";
import { render, screen } from "../../test/utils";

describe("Select Component Test", () => {
  const data = [{ label: "Option A" }, { label: "Option B" }, { label: "Option C" }];

  it("Should render Select component with default properties", () => {
    render(<Select label={"Label"} options={data as []} open={true} />);

    const labelElement = screen.getByText("Option A");
    expect(labelElement).toBeInTheDocument();
  });

  it("Should render Select component with error validation", () => {
    const message = "Message error";
    const { container } = render(<Select label={"Label"} options={[]} error={message} />);

    expect(container.querySelector("p")?.textContent).toEqual(message);
  });
});
