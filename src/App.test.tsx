import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza o nome Kesia Silva", () => {
    render(<App />);
    expect(screen.getByText(/Kesia Silva/i)).toBeInTheDocument();
});
