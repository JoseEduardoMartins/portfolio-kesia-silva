import { render, screen } from "@testing-library/react";
import "@/i18n";
import Contents from "./Contents";

test("Contents tem id indice e lista as 5 seções com âncoras", () => {
    const { container } = render(<Contents />);
    expect(container.querySelector("section#indice")).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
        "#sobre",
        "#servicos",
        "#trabalho",
        "#trajetoria",
        "#contato",
    ]);
});
