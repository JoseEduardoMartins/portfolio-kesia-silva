import { render, screen } from "@testing-library/react";
import "@/i18n";
import Layout from "./Layout";

test("Layout tem skip-link, header, main e footer", () => {
    const { container } = render(
        <Layout>
            <p>conteúdo</p>
        </Layout>
    );
    expect(screen.getByText("Pular para o conteúdo")).toBeInTheDocument();
    expect(container.querySelector("header#top")).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveTextContent("conteúdo");
    expect(container.querySelector("footer")).toBeInTheDocument();
});
