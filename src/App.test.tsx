import { render, screen } from "@testing-library/react";
import "@/i18n";
import App from "./App";

test("App renderiza layout completo com nome Kesia Silva", () => {
    render(<App />);
    expect(screen.getAllByText(/Kesia|Silva/).length).toBeGreaterThan(0);
    expect(document.querySelector("footer")).toBeInTheDocument();
});
