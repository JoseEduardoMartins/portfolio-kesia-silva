import { render, screen } from "@testing-library/react";
import "@/i18n";
import Work from "./Work";
import projects from "@/data/projects";

test("Work mostra o título e os três projetos", () => {
    render(<Work />);
    expect(
        screen.getByRole("heading", { level: 2, name: "Projetos" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { level: 3, name: "Savora" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { level: 3, name: "Infinider" })
    ).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { level: 3, name: "Mundo Pet Feliz" })
    ).toBeInTheDocument();
});

test("Work renderiza todas as peças com alt e caminho /projetos/", () => {
    const { container } = render(<Work />);
    const total = projects.reduce(
        (n, p) => n + p.rows.reduce((m, r) => m + r.images.length, 0),
        0
    );
    // querySelectorAll em vez de getByRole: slides inativos do carrossel ficam
    // aria-hidden (fora da árvore de acessibilidade), mas continuam no DOM.
    const imgs = Array.from(container.querySelectorAll("img"));
    expect(imgs).toHaveLength(total);
    imgs.forEach((img) => {
        expect(img).toHaveAttribute("alt");
        expect(img.getAttribute("alt")).not.toBe("");
        expect(img.getAttribute("src")).toMatch(/^\/projetos\/.+\.webp$/);
    });
});
