import type { ReactNode } from "react";
import SkipLink from "@/components/atoms/SkipLink";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

const Layout = ({ children }: { children: ReactNode }) => (
    <>
        <SkipLink href="#sobre">Pular para o conteúdo</SkipLink>
        <Header />
        <main>{children}</main>
        <Footer />
    </>
);

export default Layout;
