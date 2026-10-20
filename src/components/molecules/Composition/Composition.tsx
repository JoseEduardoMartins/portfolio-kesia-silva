const Composition = () => (
    <div className="relative my-auto h-40" aria-hidden="true">
        <span className="absolute w-[5.5rem] h-[5.5rem] rounded-full bg-gold top-4 left-4" />
        <span className="absolute w-12 h-32 bg-ink right-6 top-2 rounded-[1.5rem]" />
        <span className="absolute w-8 h-8 rounded-full bg-coral bottom-2 left-14" />
        <span className="absolute w-16 h-16 rounded-full border-[6px] border-paper bottom-0 right-2" />
    </div>
);

export default Composition;
