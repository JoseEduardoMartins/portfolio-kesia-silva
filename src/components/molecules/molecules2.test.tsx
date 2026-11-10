import { render, screen } from "@testing-library/react";
import "@/i18n";
import ServiceCard from "./ServiceCard";

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
