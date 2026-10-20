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

test("SectionLabel fica fora da linha do título (igual ao index.html)", () => {
    // No original, .section__label é bloco isolado ACIMA de .language__head;
    // a linha justify-between contém só título + nota.
    const { container } = render(<VisualSystem />);
    const head = container.querySelector("#language-title")!.parentElement!;
    expect(head.textContent).toMatch(/vocabulário estético/); // nota presente
    expect(head.textContent).not.toContain("03"); // rótulo NÃO está na linha
});
