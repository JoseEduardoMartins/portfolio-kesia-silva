import { render, screen } from "@testing-library/react";
import "@/i18n";
import About from "./About";

test("About tem id sobre, lead com highlight e nomes em negrito", () => {
    const { container } = render(<About />);
    expect(container.querySelector("section#sobre")).toBeInTheDocument();
    expect(screen.getByText("design de alto impacto")).toBeInTheDocument();
    expect(screen.getByText("Feel Tech RH").tagName).toBe("STRONG");
});
