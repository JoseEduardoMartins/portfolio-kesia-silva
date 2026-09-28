import { render, screen } from "@testing-library/react";
import "@/i18n";
import ServiceCard from "./ServiceCard";
import Swatches from "./Swatches";

test("ServiceCard mostra idx, título e descrição", () => {
    render(
        <ServiceCard
            idx="S/01"
            titleKey="services.items.s01.title"
            descriptionKey="services.items.s01.description"
        />
    );
    expect(screen.getByText("S/01")).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { name: "Identidade & Branding" })
    ).toBeInTheDocument();
});

test("Swatches renderiza as 4 cores da paleta", () => {
    render(<Swatches />);
    expect(screen.getByText("Ameixa")).toBeInTheDocument();
    expect(screen.getByText("Ouro")).toBeInTheDocument();
});
