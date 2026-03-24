import { useEffect, useState } from 'react'

function MemoryModal({ memory, currentIndex, totalCount, onClose, onNext, onUpdateMemory }) {
    const [editTitle, setEditTitle] = useState(memory.title)
    const [editMessage, setEditMessage] = useState(memory.message)
    const [editImageFile, setEditImageFile] = useState(null)

    useEffect(() => {
        setEditTitle(memory.title)
        setEditMessage(memory.message)
    }, [memory])

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

    const handleSaveChanges = async () => {
        const updates = {
            title: editTitle.trim() || memory.title,
            message: editMessage.trim() || memory.message,
        }

        if (editImageFile) {
            try {
                updates.image = await compressImage(editImageFile)
            } catch {
                alert('Failed to compress the new image.')
                return
            }
        }

        onUpdateMemory(memory.id, updates)
    }

    return (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/80 px-4 backdrop-blur-sm" role="dialog" aria-modal="true">
            <article className="w-full max-w-2xl rounded-3xl border border-amber-100/20 bg-slate-900/95 p-6 text-left shadow-2xl sm:p-8">
                <header className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70">Memory {currentIndex}/{totalCount}</p>
                        <h3 className="font-display text-3xl text-amber-50">{editTitle}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-amber-100/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-100"
                    >
                        Close
                    </button>
                </header>

                <div className="mb-4 grid gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                        <label htmlFor="editTitle" className="text-xs uppercase tracking-[0.2em] text-amber-200/70">Edit Title</label>
                        <input
                            id="editTitle"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-300"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="editMessage" className="text-xs uppercase tracking-[0.2em] text-amber-200/70">Edit Description</label>
                        <textarea
                            id="editMessage"
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="mt-1 h-20 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-300"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <img
                            src={memory.image}
                            alt={memory.title}
                            className="mb-2 h-48 w-full rounded-2xl object-cover"
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="editImage" className="text-xs uppercase tracking-[0.2em] text-amber-200/70">Update Image</label>
                        <input
                            id="editImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEditImageFile(e.target.files?.[0] ?? null)}
                            className="mt-1 w-full text-xs text-slate-100"
                        />
                    </div>
                </div>

                <p className="text-lg leading-relaxed text-slate-100">{editMessage}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="rounded-full border border-emerald-200/70 bg-emerald-100/15 px-5 py-2 text-xs uppercase tracking-[0.25em] text-emerald-100 transition hover:bg-emerald-100/30"
                    >
                        Save Changes
                    </button>
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
