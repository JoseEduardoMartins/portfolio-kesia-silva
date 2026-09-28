import Swatch from "@/components/atoms/Swatch";
import palette from "@/data/palette";

const Swatches = () => (
    <div className="grid grid-cols-2 gap-[0.6rem] my-auto">
        {palette.map((c) => (
            <Swatch key={c.hex} {...c} />
        ))}
    </div>
);

export default Swatches;
