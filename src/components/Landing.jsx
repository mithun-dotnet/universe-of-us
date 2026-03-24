import { useEffect } from 'react'

function Landing({ onStart }) {
    useEffect(() => {
        // Create animated shooting stars
        const createShootingStar = () => {
            const star = document.createElement('div')
            const size = Math.random() * 2 + 1
            const duration = Math.random() * 3 + 2
            const delay = Math.random() * 2

            star.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, white, transparent);
                border-radius: 50%;
                pointer-events: none;
                top: ${Math.random() * 40}%;
                left: -10px;
                animation: shootingStar ${duration}s linear ${delay}s forwards;
                box-shadow: 0 0 ${size * 3}px rgba(255, 255, 255, 0.8);
            `

            document.body.appendChild(star)
            setTimeout(() => star.remove(), (duration + delay) * 1000)
        }

        // Add shooting stars periodically
        const shootingStarInterval = setInterval(createShootingStar, 1000)

        return () => clearInterval(shootingStarInterval)
    }, [])

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center gap-8 text-center overflow-hidden">
            {/* Galaxy Background Image */}
            <div
                className="absolute inset-0 -z-10 opacity-40"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(2px)',
                }}
                aria-hidden="true"
            />

            {/* Moon */}
            <div
                className="absolute top-16 right-20 -z-5 opacity-80"
                style={{
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 200, 0.4))',
                    borderRadius: '50%',
                    boxShadow: '0 0 60px rgba(255, 255, 150, 0.3), inset -20px -20px 30px rgba(0, 0, 0, 0.3)',
                }}
                aria-hidden="true"
            />

            {/* Twinkling Stars Overlay */}
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 2 + 0.5 + 'px',
                            height: Math.random() * 2 + 0.5 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                            animationDelay: Math.random() * 2 + 's',
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Universe Heart Background + Couple at Top */}
            <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
                <div className="heart-bg">❤️</div>
            </div>

            <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2">
                <div className="couple-top">
                    <span className="couple-name">Mithun</span>
                    <span className="couple-icon">👫</span>
                    <span className="couple-name">Kiran</span>
                </div>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                <div className="love-run"></div>
            </div>

            <p className="font-sans text-sm uppercase tracking-[0.45em] text-pink-200/80 relative z-10">
                Universe of Us: Mithun & Kiran
            </p>

            <h1 className="max-w-4xl font-display text-5xl leading-tight text-pink-100 sm:text-7xl relative z-10">
                Every star is a chapter in our love story.
            </h1>

            <p className="max-w-2xl text-base text-pink-200/90 sm:text-lg relative z-10">
                Experience a sparkling journey through shared hearts, promises, and unforgettable moments under the romantic firmament.
            </p>

            <button
                type="button"
                onClick={onStart}
                className="rounded-full border border-amber-200/60 bg-amber-100/10 px-8 py-3 font-sans text-sm uppercase tracking-[0.35em] text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-100/20 relative z-10"
            >
                Start Journey
            </button>

            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                @keyframes shootingStar {
                    0% {
                        transform: translateX(0) translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(100vw) translateY(100vh);
                        opacity: 0;
                    }
                }

                @keyframes loveRun {
                    0% { transform: translate(-20%, 110%); opacity: 0; }
                    30% { opacity: 1; }
                    50% { transform: translate(20%, -20%); }
                    100% { transform: translate(120%, -120%); opacity: 0; }
                }

                @keyframes couplePulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.14); }
                }

                .love-run {
                    position: absolute;
                    top: 40%;
                    left: -10%;
                    width: 220px;
                    height: 220px;
                    border-radius: 50%;
                    border: 2px dashed rgba(240, 152, 255, 0.35);
                    box-shadow: 0 0 20px rgba(240, 152, 255, 0.5);
                    animation: loveRun 13s linear infinite;
                }

                .heart-bg {
                    position: absolute;
                    inset: 0;
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    background: radial-gradient(circle at 50% 40%, rgba(255, 101, 173, 0.18), transparent 45%),
                                radial-gradient(circle at 40% 65%, rgba(255, 60, 120, 0.12), transparent 35%),
                                radial-gradient(circle at 60% 30%, rgba(255, 214, 236, 0.12), transparent 30%);
                    overflow: hidden;
                }

                .heart-bg::before {
                    content: '❤️';
                    font-size: 26rem;
                    color: rgba(255, 105, 180, 0.22);
                    transform: translate(-10%, 0) rotate(-5deg);
                    filter: blur(1.6px);
                    animation: heartFloat 12s ease-in-out infinite;
                }

                @keyframes heartFloat {
                    0%, 100% { transform: translate(-10%, 0) rotate(-5deg); }
                    50% { transform: translate(-10%, -8%) rotate(2deg); }
                }

                .couple-top {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.8rem;
                    font-size: 2.1rem;
                    padding: 0;
                    border-radius: 0;
                    background: transparent;
                    backdrop-filter: none;
                    border: none;
                    box-shadow: none;
                    animation: couplePulse 2.8s infinite ease-in-out;
                }

                .couple-name {
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #ffe4fd;
                }

                .couple-icon {
                    font-size: 1.8rem;
                    margin: 0 0.05rem;
                }

                .couple-icon,
                .heart-icon {
                    font-size: 3rem;
                }

                .heart-icon {
                    animation: couplePulse 1.2s infinite ease-in-out;
                }
            `}</style>
        </section>
    )
}

export default Landing
