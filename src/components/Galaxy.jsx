function Galaxy({ memories, unlockedIds, onOpenMemory, onFinish }) {
    const progress = Math.round((unlockedIds.length / memories.length) * 100)

    return (
        <section className="relative z-10">
            <header className="mb-10 flex flex-wrap items-center justify-between gap-6">
                <div>
                    <p className="font-sans text-xs uppercase tracking-[0.35em] text-amber-200/70">Galaxy</p>
                    <h2 className="font-display text-4xl text-amber-50 sm:text-5xl">Constellation of Memories</h2>
                </div>

                <div className="flex items-center gap-4">
                    <div
                        className="grid h-16 w-16 place-items-center rounded-full"
                        style={{
                            background: `conic-gradient(#f59e0b ${progress}%, rgba(251, 191, 36, 0.2) ${progress}% 100%)`,
                        }}
                        aria-label={`Journey progress ${progress} percent`}
                    >
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-950 text-xs text-amber-100">
                            {progress}%
                        </div>
                    </div>
                    <p className="text-sm text-slate-200">{unlockedIds.length}/{memories.length} memories discovered</p>
                </div>
            </header>

            <div className="relative rounded-3xl border border-slate-700/40 bg-slate-900/45 p-4 backdrop-blur-md sm:p-8">
                <div className="constellation-lines" aria-hidden="true" />

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {memories.map((memory, index) => {
                        const isUnlocked = unlockedIds.includes(memory.id)

                        return (
                            <button
                                key={memory.id}
                                type="button"
                                onClick={() => onOpenMemory(memory.id)}
                                className="memory-orb group relative aspect-square rounded-full border border-amber-100/30 bg-slate-950/60 p-4 text-center"
                            >
                                <span className="absolute left-3 top-3 text-xs text-amber-100/70">{String(index + 1).padStart(2, '0')}</span>
                                <span className="block pt-7 font-sans text-xs uppercase tracking-[0.15em] text-amber-100/90 sm:text-sm">
                                    {memory.title}
                                </span>
                                <span className="mt-2 block text-xs text-slate-300">
                                    {isUnlocked ? 'Unlocked' : 'Tap to unlock'}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                    type="button"
                    onClick={onFinish}
                    className="rounded-full border border-amber-200/60 bg-amber-100/10 px-8 py-3 text-xs uppercase tracking-[0.35em] text-amber-100 transition hover:bg-amber-100/20"
                >
                    Go To Final Screen
                </button>
            </div>
        </section>
    )
}

export default Galaxy
