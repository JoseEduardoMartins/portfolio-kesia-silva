import { render, screen } from "@testing-library/react";
import "@/i18n";
import Timeline from "./Timeline";

test("Timeline mostra experiências, certs e skills", () => {
    const { container } = render(<Timeline />);
    expect(container.querySelector("section#trajetoria")).toBeInTheDocument();
    expect(
        screen.getByRole("heading", { name: "Designer Gráfica" })
    ).toBeInTheDocument();
    expect(screen.getByText("PUC-RS")).toBeInTheDocument();
    expect(screen.getByText("IA generativa")).toBeInTheDocument();
});
