function MemoryModal({ memory, currentIndex, totalCount, onClose, onNext }) {
    return (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/80 px-4 backdrop-blur-sm" role="dialog" aria-modal="true">
            <article className="w-full max-w-2xl rounded-3xl border border-amber-100/20 bg-slate-900/95 p-6 text-left shadow-2xl sm:p-8">
                <header className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">Memory {currentIndex}/{totalCount}</p>
                        <h3 className="font-display text-3xl text-amber-50">{memory.title}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-amber-100/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100"
                    >
                        Close
                    </button>
                </header>

                <img
                    src={memory.image}
                    alt={memory.title}
                    className="mb-5 h-64 w-full rounded-2xl object-cover sm:h-80"
                />

                <p className="text-lg leading-relaxed text-slate-100">{memory.message}</p>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onNext}
                        className="rounded-full border border-amber-200/60 bg-amber-100/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-amber-100 transition hover:bg-amber-100/20"
                    >
                        Next Memory
                    </button>
                </div>
            </article>
        </div>
    )
}

export default MemoryModal
