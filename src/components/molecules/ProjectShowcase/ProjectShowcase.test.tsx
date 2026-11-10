import { render, screen } from "@testing-library/react";
import "@/i18n";
import ProjectShowcase from "./ProjectShowcase";
import type { Project } from "@/types";

const project: Project = {
    slug: "savora",
    index: "01",
    name: "Savora",
    segment: "Restaurante",
    deliverables: "Marca · Embalagens · Sinalização",
    ledeKey: "work.projects.savora.lede",
    rows: [
        {
            type: "full",
            images: [{ src: "/projetos/savora/faixada.webp", alt: "Fachada Savora" }],
        },
        {
            type: "offset",
            noteKey: "work.projects.savora.note",
            images: [
                { src: "/projetos/savora/copo.webp", alt: "Copo Savora" },
                { src: "/projetos/savora/adesivo.webp", alt: "Adesivo Savora" },
            ],
        },
    ],
};

test("ProjectShowcase mostra nome, segmento e lede", () => {
    render(<ProjectShowcase project={project} />);
    expect(
        screen.getByRole("heading", { level: 3, name: "Savora" })
    ).toBeInTheDocument();
    expect(screen.getByText("Restaurante")).toBeInTheDocument();
    expect(
        screen.getByText(/restaurante de clima afetivo/i)
    ).toBeInTheDocument();
});

test("ProjectShowcase renderiza as peças das linhas", () => {
    render(<ProjectShowcase project={project} />);
    expect(screen.getByAltText("Fachada Savora")).toBeInTheDocument();
    expect(screen.getByAltText("Copo Savora")).toBeInTheDocument();
    expect(screen.getByAltText("Adesivo Savora")).toBeInTheDocument();
});
