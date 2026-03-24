import { useMemo, useState } from 'react'
import AIMessage from './AIMessage'

function FinalScreen({ totalMemories, unlockedCount, onReplay }) {
    const [copied, setCopied] = useState(false)
    const shareUrl = useMemo(() => (typeof window === 'undefined' ? '' : window.location.href), [])
    const qrSource = useMemo(
        () => `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl || 'https://vercel.com')}`,
        [shareUrl],
    )

    const copyLink = async () => {
        if (!shareUrl) return

        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
    }

    return (
        <section className="space-y-8">
            <header className="text-center">
                <p className="mb-2 text-xs uppercase tracking-[0.35em] text-amber-200/75">Final Chapter</p>
                <h2 className="font-display text-5xl text-amber-50">Our Story, On Repeat</h2>
                <p className="mt-3 text-slate-200">
                    Memories unlocked: {unlockedCount}/{totalMemories}
                </p>
            </header>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <article className="rounded-3xl border border-slate-700/40 bg-slate-900/55 p-4 sm:p-6">
                    <video
                        controls
                        className="h-full min-h-72 w-full rounded-2xl object-cover"
                        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                    />
                    <p className="mt-3 text-sm text-slate-300">Replace this with your personal 1 to 2 minute video in `public/final-video.mp4`.</p>
                </article>

                <AIMessage />
            </div>

            <footer className="rounded-3xl border border-amber-100/20 bg-slate-900/50 p-6">
                <h3 className="font-display text-3xl text-amber-50">For You, Always.</h3>
                <p className="mb-5 mt-2 text-slate-200">Thank you for every laugh, every lesson, and every warm silence.</p>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={onReplay}
                        className="rounded-full border border-amber-200/60 bg-amber-100/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-amber-100 transition hover:bg-amber-100/20"
                    >
                        Replay Journey
                    </button>

                    <button
                        type="button"
                        onClick={copyLink}
                        className="rounded-full border border-slate-500/70 px-5 py-2 text-xs uppercase tracking-[0.25em] text-slate-200"
                    >
                        {copied ? 'Copied' : 'Copy Link'}
                    </button>

                    <img src={qrSource} alt="QR code to share this page" className="h-16 w-16 rounded-md border border-amber-100/30 bg-white p-1" />
                </div>
            </footer>
        </section>
    )
}

export default FinalScreen
