import { render, screen } from "@testing-library/react";
import "@/i18n";
import Header from "./Header";

test("Header tem id top e a marca", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("header#top")).toBeInTheDocument();
    expect(screen.getByText(/Kesia/)).toBeInTheDocument();
});
