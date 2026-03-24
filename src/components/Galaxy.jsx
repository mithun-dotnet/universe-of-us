import { useState } from 'react'

function Galaxy({ memories, unlockedIds, onOpenMemory, onAddMemory, onFinish }) {
    const progress = Math.round((unlockedIds.length / memories.length) * 100)
    const [newTitle, setNewTitle] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [newImageFile, setNewImageFile] = useState(null)
    const [isAdding, setIsAdding] = useState(false)

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const img = new Image()
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    const maxDimension = 1200
                    let { width, height } = img
                    if (width > maxDimension || height > maxDimension) {
                        const ratio = Math.max(width / maxDimension, height / maxDimension)
                        width = Math.round(width / ratio)
                        height = Math.round(height / ratio)
                    }
                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, width, height)
                    const compressedData = canvas.toDataURL('image/jpeg', 0.72)
                    resolve(compressedData)
                }
                img.onerror = reject
                img.src = reader.result
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    const handleAdd = async (event) => {
        event.preventDefault()
        if (!newTitle.trim() || !newMessage.trim()) {
            alert('Please add both title and description.')
            return
        }

        setIsAdding(true)
        try {
            let image = 'https://picsum.photos/seed/universe-new/900/600'
            if (newImageFile) {
                image = await compressImage(newImageFile)
            }
            onAddMemory({
                title: newTitle.trim(),
                message: newMessage.trim(),
                image,
            })
            setNewTitle('')
            setNewMessage('')
            setNewImageFile(null)
            event.target.reset()
        } catch (error) {
            console.error(error)
            alert('Failed to add memory. Try another image.')
        } finally {
            setIsAdding(false)
        }
    }

    const handleFileChange = (event) => {
        setNewImageFile(event.target.files?.[0] ?? null)
    }

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

            <form
                onSubmit={handleAdd}
                className="mb-6 grid gap-3 rounded-2xl border border-slate-700/35 bg-slate-950/60 p-4 sm:grid-cols-3 sm:items-end sm:p-5"
            >
                <div className="sm:col-span-1">
                    <label className="text-xs uppercase tracking-wider text-amber-200/70" htmlFor="newMemoryTitle">
                        Title
                    </label>
                    <input
                        id="newMemoryTitle"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100 outline-none focus:border-amber-300"
                        placeholder="Memory title"
                    />
                </div>

                <div className="sm:col-span-1">
                    <label className="text-xs uppercase tracking-wider text-amber-200/70" htmlFor="newMemoryMessage">
                        Description
                    </label>
                    <input
                        id="newMemoryMessage"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100 outline-none focus:border-amber-300"
                        placeholder="Memory description"
                    />
                </div>

                <div className="sm:col-span-1">
                    <label className="text-xs uppercase tracking-wider text-amber-200/70" htmlFor="newMemoryImage">
                        Image (local)
                    </label>
                    <input
                        id="newMemoryImage"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 w-full text-xs text-slate-100"
                    />
                    <button
                        type="submit"
                        disabled={isAdding}
                        className="mt-2 w-full rounded-full border border-amber-200/60 bg-amber-100/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-amber-100 transition hover:bg-amber-100/20 disabled:opacity-50"
                    >
                        {isAdding ? 'Adding...' : 'Add Memory'}
                    </button>
                </div>

                <p className="sm:col-span-3 text-xs text-slate-400">Note: uploaded images are compressed in the browser for best performance before adding to memory list.</p>
            </form>

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
