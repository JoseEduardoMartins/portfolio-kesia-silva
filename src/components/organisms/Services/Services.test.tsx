import { render, screen } from "@testing-library/react";
import "@/i18n";
import Services from "./Services";

test("Services lista os 8 serviços", () => {
    const { container } = render(<Services />);
    expect(container.querySelector("section#servicos")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(8);
    expect(screen.getByRole("heading", { name: "Animação" })).toBeInTheDocument();
});
