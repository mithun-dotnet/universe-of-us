import { useEffect, useMemo, useRef, useState } from 'react'
import Landing from './components/Landing'
import Galaxy from './components/Galaxy'
import MemoryModal from './components/MemoryModal'
import FinalScreen from './components/FinalScreen'
import { memories } from './data/memories'

function App() {
  const [screen, setScreen] = useState('landing')
  const [memoryList, setMemoryList] = useState(memories)
  const [selectedMemoryId, setSelectedMemoryId] = useState(null)
  const [unlockedIds, setUnlockedIds] = useState([])
  const [musicEnabled, setMusicEnabled] = useState(false)
  const bgMusicRef = useRef(null)

  const selectedMemory = useMemo(
    () => memoryList.find((memory) => memory.id === selectedMemoryId) ?? null,
    [memoryList, selectedMemoryId],
  )

  useEffect(() => {
    if (!bgMusicRef.current) {
      return
    }

    if (musicEnabled) {
      bgMusicRef.current.play().catch(() => {
        setMusicEnabled(false)
      })
    } else {
      bgMusicRef.current.pause()
    }
  }, [musicEnabled])

  const unlockMemory = (id) => {
    setUnlockedIds((current) => (current.includes(id) ? current : [...current, id]))
  }

  const handleOpenMemory = (id) => {
    unlockMemory(id)
    setSelectedMemoryId(id)
  }

  const handleAddMemory = (memory) => {
    setMemoryList((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((m) => m.id)) + 1 : 1,
        ...memory,
      },
    ])
  }

  const handleUpdateMemory = (id, updates) => {
    setMemoryList((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)))
  }

  const handleNextMemory = () => {
    if (!selectedMemory) {
      return
    }

    const currentIndex = memories.findIndex((memory) => memory.id === selectedMemory.id)
    const nextMemory = memories[(currentIndex + 1) % memories.length]
    unlockMemory(nextMemory.id)
    setSelectedMemoryId(nextMemory.id)
  }

  const handleReplay = () => {
    setScreen('landing')
    setSelectedMemoryId(null)
    setUnlockedIds([])
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="space-bg" aria-hidden="true" />
      <div className="star-layer stars-slow" aria-hidden="true" />
      <div className="star-layer stars-medium" aria-hidden="true" />
      <div className="star-layer stars-fast" aria-hidden="true" />
      <div className="twinkle-layer" aria-hidden="true" />
      <div className="glow-layer" aria-hidden="true" />

      <audio
        ref={bgMusicRef}
        loop
        preload="none"
        src={import.meta.env.VITE_MUSIC_URL || "https://cdn.pixabay.com/download/audio/2022/03/10/audio_72f34f6f6e.mp3?filename=romantic-piano-114970.mp3"}
      />
      {/* 
        To use "Tum Hi Ho" from Aashiqui 2, you have these legal options:
        
        1. SPOTIFY EMBED (Recommended):
           - Add to .env: VITE_MUSIC_URL=spotify:track:5kZjWw0D4fHwCRYhRXdxHQ
           - Use Spotify Web API to fetch preview URL
        
        2. YOUTUBE EMBED:
           - Use YouTube Data API or embed player
           - Extract audio using yt-dlp (check local laws)
        
        3. PURCHASE LICENSE:
           - iTunes, Amazon Music, or Wynk Music
           - Upload licensed file to your public folder
           - Use: /your-music-file.mp3
        
        4. ROYALTY-FREE ALTERNATIVE:
           - Search "Tum Hi Ho" royalty-free covers on Pixabay/Freepik
           - Use VITE_MUSIC_URL in .env for easy swaps
      */}

      <button
        type="button"
        onClick={() => setMusicEnabled((enabled) => !enabled)}
        className="fixed right-4 top-4 z-50 rounded-full border border-amber-200/50 bg-slate-900/80 px-4 py-2 text-xs tracking-[0.2em] text-amber-100 backdrop-blur-sm"
      >
        {musicEnabled ? 'MUSIC ON' : 'MUSIC OFF'}
      </button>

      <section className="relative z-10 mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-8">
        {screen === 'landing' && <Landing onStart={() => setScreen('galaxy')} />}

        {screen === 'galaxy' && (
          <Galaxy
            memories={memoryList}
            unlockedIds={unlockedIds}
            onOpenMemory={handleOpenMemory}
            onAddMemory={handleAddMemory}
            onFinish={() => setScreen('final')}
          />
        )}

        {screen === 'final' && (
          <FinalScreen
            totalMemories={memoryList.length}
            unlockedCount={unlockedIds.length}
            onReplay={handleReplay}
          />
        )}
      </section>

      {selectedMemory && screen === 'galaxy' && (
        <MemoryModal
          memory={selectedMemory}
          totalCount={memoryList.length}
          currentIndex={memoryList.findIndex((memory) => memory.id === selectedMemory.id) + 1}
          onClose={() => setSelectedMemoryId(null)}
          onNext={handleNextMemory}
          onUpdateMemory={handleUpdateMemory}
        />
      )}
    </main>
  )
}

export default App
