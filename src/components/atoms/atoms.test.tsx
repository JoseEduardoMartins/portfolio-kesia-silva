import { render, screen } from "@testing-library/react";
import Button from "./Button";
import Highlight from "./Highlight";

test("Button aplica variante e tamanho e é um link", () => {
    render(
        <Button href="#contato" variant="solid" size="lg">
            Ir
        </Button>
    );
    const link = screen.getByRole("link", { name: "Ir" });
    expect(link).toHaveAttribute("href", "#contato");
    expect(link.className).toMatch(/bg-coral/);
});

test("Button ghost/outline têm classes distintas de solid", () => {
    const { rerender } = render(
        <Button href="#a" variant="ghost">
            g
        </Button>
    );
    const ghost = screen.getByRole("link").className;
    rerender(
        <Button href="#a" variant="outline">
            o
        </Button>
    );
    const outline = screen.getByRole("link").className;
    expect(ghost).not.toBe(outline);
});

test("Highlight coral usa a classe hl-coral", () => {
    const { container } = render(<Highlight coral>x</Highlight>);
    expect(container.firstChild).toHaveClass("hl-coral");
});
