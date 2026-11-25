import { render, screen } from "@testing-library/react";
import "@/i18n";
import About from "./About";

test("About tem id sobre, lead com highlight e nomes em negrito", () => {
    const { container } = render(<About />);
    expect(container.querySelector("section#sobre")).toBeInTheDocument();
    expect(screen.getByText("Design Gráfico")).toBeInTheDocument();
    expect(screen.getByText("Affinity").tagName).toBe("STRONG");
});
