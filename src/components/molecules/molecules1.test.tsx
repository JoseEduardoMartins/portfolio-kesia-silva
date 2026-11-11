import { render, screen } from "@testing-library/react";
import "@/i18n";
import NavLinks from "./NavLinks";

test("NavLinks renderiza o CTA de contato", () => {
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute(
        "href",
        "#contato"
    );
});
