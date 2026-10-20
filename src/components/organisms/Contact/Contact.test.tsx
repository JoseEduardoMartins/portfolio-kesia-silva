import { render, screen } from "@testing-library/react";
import "@/i18n";
import Contact from "./Contact";

test("Contact tem mailto e LinkedIn externo", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("section#contato")).toBeInTheDocument();
    expect(
        screen.getByRole("link", { name: "Enviar e-mail" }).getAttribute("href")
    ).toMatch(/^mailto:/);
    const li = screen.getByRole("link", { name: "LinkedIn ↗" });
    expect(li).toHaveAttribute("target", "_blank");
    expect(li).toHaveAttribute("rel", expect.stringContaining("noopener"));
});
