import { render, screen } from "@testing-library/react";
import "@/i18n";
import Hero from "./Hero";

test("Hero mostra nome e CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Kesia");
    expect(
        screen.getByRole("link", { name: "Vamos criar juntos" })
    ).toHaveAttribute("href", "#contato");
    expect(
        screen.getByRole("link", { name: "Ver linguagem visual" })
    ).toHaveAttribute("href", "#trabalho");
});
