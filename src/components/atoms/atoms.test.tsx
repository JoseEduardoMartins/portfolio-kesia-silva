import { render, screen } from "@testing-library/react";
import Button from "./Button";
import Highlight from "./Highlight";
import Grain from "./Grain";
import ScriptLabel from "./ScriptLabel";
import SelectionFrame from "./SelectionFrame";

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

test("Grain é decorativo (aria-hidden) com a classe grain", () => {
    const { container } = render(<Grain />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("grain");
    expect(el).toHaveAttribute("aria-hidden", "true");
});

test("ScriptLabel usa font-script e é decorativo", () => {
    const { container } = render(<ScriptLabel>oi</ScriptLabel>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveTextContent("oi");
    expect(el.className).toMatch(/font-script/);
    expect(el).toHaveAttribute("aria-hidden", "true");
});

test("SelectionFrame é decorativo e tem 4 cantos", () => {
    const { container } = render(<SelectionFrame />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("handles");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el.querySelectorAll(".handle-corner")).toHaveLength(4);
});

test("SelectionFrame light adiciona a variante clara", () => {
    const { container } = render(<SelectionFrame light />);
    expect(container.firstChild).toHaveClass("handles--light");
});
