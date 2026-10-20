interface SelectionFrameProps {
    /** Use em fundos escuros (borda translúcida clara). */
    light?: boolean;
    className?: string;
}

/**
 * Moldura decorativa estilo "handles" de ferramenta de design: borda tracejada
 * com quadradinhos de canto. Deve ficar dentro de um container `relative`, como
 * irmão do conteúdo (igual ao padrão de `Grain`). Puramente visual.
 */
const SelectionFrame = ({ light = false, className = "" }: SelectionFrameProps) => (
    <span
        aria-hidden="true"
        className={`handles ${light ? "handles--light" : ""} ${className}`}
    >
        <span className="handle-corner -top-[3px] -left-[3px]" />
        <span className="handle-corner -top-[3px] -right-[3px]" />
        <span className="handle-corner -bottom-[3px] -left-[3px]" />
        <span className="handle-corner -bottom-[3px] -right-[3px]" />
    </span>
);

export default SelectionFrame;
