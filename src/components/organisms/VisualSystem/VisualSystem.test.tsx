import { render, screen } from "@testing-library/react";
import "@/i18n";
import VisualSystem from "./VisualSystem";

test("VisualSystem tem id trabalho, monograma e placeholder", () => {
    const { container } = render(<VisualSystem />);
    expect(container.querySelector("section#trabalho")).toBeInTheDocument();
    expect(screen.getByText("KS")).toBeInTheDocument();
    expect(
        screen.getByText(/espaço reservado para portfólio/)
    ).toBeInTheDocument();
});
