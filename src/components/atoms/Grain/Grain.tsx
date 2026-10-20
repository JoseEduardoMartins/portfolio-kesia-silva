interface GrainProps {
    className?: string;
}

/** Textura de grão decorativa para seções escuras. Puramente visual. */
const Grain = ({ className = "" }: GrainProps) => (
    <div className={`grain ${className}`} aria-hidden="true" />
);

export default Grain;
