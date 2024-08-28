import { act, fireEvent, render, screen } from "@test/utils";
import { InitialRegistration } from "./initialRegistration";

const mockedUsedNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Initial registration test", () => {
  it("Should render screen", () => {
    const { container } = render(<InitialRegistration />);

    const screenElement = screen.getByText(/Preencha seus dados:/);
    const inputElements = container.querySelectorAll("input[type=text]");

    expect(inputElements).toHaveLength(2);
    expect(screenElement).toBeInTheDocument();
  });

  it("Should throw validation", async () => {
    render(<InitialRegistration />);

    const submitElement = screen.getByText("Salvar");
    expect(submitElement).toBeInTheDocument();

    await act(() => {
      fireEvent.click(submitElement);
    });

    const validationNameMessage = screen.getByText("O nome é obrigatório");
    const validationEmailMessage = screen.getByText("O e-mail é obrigatório");
    const validationPasswordMessage = screen.getByText("A senha deve ter no mínimo 6 caracteres");
    const validationConfirmPasswordMessage = screen.getByText("Digite sua senha");

    expect(validationNameMessage).toBeInTheDocument();
    expect(validationEmailMessage).toBeInTheDocument();
    expect(validationPasswordMessage).toBeInTheDocument();
    expect(validationConfirmPasswordMessage).toBeInTheDocument();
  });
});
