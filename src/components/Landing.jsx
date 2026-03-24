function Landing({ onStart }) {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center gap-8 text-center">
            <p className="font-sans text-sm uppercase tracking-[0.45em] text-amber-200/80">
                Universe of Us
            </p>

            <h1 className="max-w-4xl font-display text-5xl leading-tight text-amber-50 sm:text-7xl">
                Every star here carries a memory of us.
            </h1>

            <p className="max-w-2xl text-base text-slate-200/85 sm:text-lg">
                A short journey through the moments that made my world brighter, ending in one final message from the heart.
            </p>

            <button
                type="button"
                onClick={onStart}
                className="rounded-full border border-amber-200/60 bg-amber-100/10 px-8 py-3 font-sans text-sm uppercase tracking-[0.35em] text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-100/20"
            >
                Start Journey
            </button>
        </section>
    )
}

export default Landing
