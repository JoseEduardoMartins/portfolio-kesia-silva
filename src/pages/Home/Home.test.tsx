import { render, screen } from "@testing-library/react";
import "@/i18n";
import Home from "./Home";

test("Home compõe as seções na ordem do index.html", () => {
    const { container } = render(<Home />);
    // Hero é <section> sem id (igual ao index.html); filtramos os vazios.
    const ids = Array.from(container.querySelectorAll("section"))
        .map((s) => s.id)
        .filter(Boolean);
    expect(ids).toEqual([
        "sobre",
        "servicos",
        "trabalho",
        "trajetoria",
        "contato",
    ]);
});

test("Home inclui o hero com o nome", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Silva");
});
