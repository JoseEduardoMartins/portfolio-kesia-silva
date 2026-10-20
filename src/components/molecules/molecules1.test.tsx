import { render, screen } from "@testing-library/react";
import "@/i18n";
import Marquee from "./Marquee";
import NavLinks from "./NavLinks";

test("Marquee é decorativo mas contém os termos", () => {
    const { container } = render(<Marquee />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.textContent).toContain("Identidade Visual");
});

test("NavLinks renderiza o CTA de contato", () => {
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute(
        "href",
        "#contato"
    );
});
