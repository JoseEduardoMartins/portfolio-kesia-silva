import Brand from "@/components/molecules/Brand";
import NavLinks from "@/components/molecules/NavLinks";

const Header = () => (
    <header
        id="top"
        className="sticky top-0 z-50 flex items-center justify-between gap-4 px-[var(--gut)] py-4 backdrop-blur-md border-b border-line"
        style={{ background: "color-mix(in srgb, var(--paper) 82%, transparent)" }}
    >
        <Brand />
        <NavLinks />
    </header>
);

export default Header;
