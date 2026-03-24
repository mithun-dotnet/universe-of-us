import { useEffect, useMemo, useRef, useState } from 'react'
import Landing from './components/Landing'
import Galaxy from './components/Galaxy'
import MemoryModal from './components/MemoryModal'
import FinalScreen from './components/FinalScreen'
import { memories } from './data/memories'

function App() {
  const [screen, setScreen] = useState('landing')
  const [selectedMemoryId, setSelectedMemoryId] = useState(null)
  const [unlockedIds, setUnlockedIds] = useState([])
  const [musicEnabled, setMusicEnabled] = useState(false)
  const bgMusicRef = useRef(null)

  const selectedMemory = useMemo(
    () => memories.find((memory) => memory.id === selectedMemoryId) ?? null,
    [selectedMemoryId],
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
        src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_72f34f6f6e.mp3?filename=romantic-piano-114970.mp3"
      />

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
            memories={memories}
            unlockedIds={unlockedIds}
            onOpenMemory={handleOpenMemory}
            onFinish={() => setScreen('final')}
          />
        )}

        {screen === 'final' && (
          <FinalScreen
            totalMemories={memories.length}
            unlockedCount={unlockedIds.length}
            onReplay={handleReplay}
          />
        )}
      </section>

      {selectedMemory && screen === 'galaxy' && (
        <MemoryModal
          memory={selectedMemory}
          totalCount={memories.length}
          currentIndex={memories.findIndex((memory) => memory.id === selectedMemory.id) + 1}
          onClose={() => setSelectedMemoryId(null)}
          onNext={handleNextMemory}
        />
      )}
    </main>
  )
}

export default App
