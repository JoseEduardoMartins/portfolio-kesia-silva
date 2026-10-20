import { render, screen } from "@testing-library/react";
import "@/i18n";
import Footer from "./Footer";

test("Footer mostra o ano corrente e link ao topo", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText((c) => c.includes(year))).toBeInTheDocument();
    expect(
        screen.getByRole("link", { name: /Voltar ao topo/ })
    ).toHaveAttribute("href", "#top");
});
