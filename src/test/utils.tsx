import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PropsWithChildren } from "react";

const BaseProviders = ({ children }: PropsWithChildren) => <div>{children}</div>;
const renderWithProviders = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: BaseProviders,
    ...options,
  });

export * from "@testing-library/react";
export { userEvent };
export { renderWithProviders as render };
