import axios from 'axios'
import { useEffect, useState } from 'react'

const MODEL_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-large'

function AIMessage() {
    const [prompt, setPrompt] = useState('Write a romantic birthday message for my wife')
    const [generatedText, setGeneratedText] = useState('')
    const [typedText, setTypedText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!generatedText) {
            setTypedText('')
            return
        }

        let currentIndex = 0
        const ticker = setInterval(() => {
            currentIndex += 1
            setTypedText(generatedText.slice(0, currentIndex))
            if (currentIndex >= generatedText.length) {
                clearInterval(ticker)
            }
        }, 24)

        return () => clearInterval(ticker)
    }, [generatedText])

    const getMessage = async () => {
        setLoading(true)
        setError('')

        try {
            const token = import.meta.env.VITE_HF_TOKEN
            const response = await axios.post(
                MODEL_URL,
                { inputs: prompt },
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                        'Content-Type': 'application/json',
                    },
                },
            )

            const value = Array.isArray(response.data)
                ? response.data[0]?.generated_text
                : response.data?.generated_text ?? response.data?.[0]?.summary_text

            setGeneratedText(value || 'You are my favorite chapter in every lifetime.')
        } catch {
            setError('Unable to generate now. Try again in a moment.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="rounded-3xl border border-slate-700/50 bg-slate-900/55 p-6">
            <h3 className="mb-2 font-display text-3xl text-amber-50">AI Love Note</h3>
            <p className="mb-4 text-sm text-slate-300">Generate a personalized message powered by Hugging Face.</p>

            <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/80 p-3 text-slate-100 outline-none ring-amber-200/40 transition focus:ring"
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={getMessage}
                    disabled={loading}
                    className="rounded-full border border-amber-200/60 bg-amber-100/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-amber-100 transition hover:bg-amber-100/20 disabled:opacity-60"
                >
                    {loading ? 'Generating' : 'Generate Message'}
                </button>
                {!import.meta.env.VITE_HF_TOKEN && (
                    <span className="text-xs text-amber-200/80">Set VITE_HF_TOKEN in .env for reliable requests.</span>
                )}
            </div>

            {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

            <p className="mt-5 min-h-24 rounded-2xl border border-amber-100/20 bg-amber-100/5 p-4 text-slate-100">
                {typedText || 'Your generated message will appear here...'}
            </p>
        </section>
    )
}

export default AIMessage
