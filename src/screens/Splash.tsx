import { Screen } from '../App'

interface Props { navigate: (s: Screen) => void }

export default function Splash({ navigate }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)' }}>
      {/* Memphis geometric decorations */}
      <div className="absolute top-16 left-12 w-16 h-16 rounded-full opacity-20" style={{ background: '#6C5CE7' }} />
      <div className="absolute top-32 right-16 w-8 h-8 rounded-full opacity-30" style={{ background: '#00B894' }} />
      <div className="absolute bottom-40 left-8 w-12 h-12 opacity-20" style={{ background: '#F59E0B', transform: 'rotate(45deg)' }} />
      <div className="absolute top-1/4 right-8 w-4 h-4 rounded-full opacity-40" style={{ background: '#F59E0B' }} />
      <div className="absolute bottom-60 right-12 w-20 h-20 rounded-full opacity-10" style={{ background: '#6C5CE7' }} />

      {/* Stars/dots pattern */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-white opacity-30"
          style={{ top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 13) % 90}%` }} />
      ))}

      <div className="relative z-10 text-center px-8 w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl mb-4 flex items-center justify-center text-4xl"
            style={{ background: 'rgba(108, 92, 231, 0.3)', border: '2px solid rgba(108, 92, 231, 0.5)', backdropFilter: 'blur(10px)' }}>
            🧭
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Career Compass</h1>
          <span className="text-sm font-medium mt-1" style={{ color: '#A29BFE' }}>Trial</span>
        </div>

        {/* Tagline */}
        <div className="mb-12">
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            診断する就活から、<br />
            <span style={{ color: '#A29BFE' }}>実験する就活</span>へ。
          </p>
          <p className="text-sm text-white/50 mt-3">
            短い仕事体験を通じて、<br />自分に合う仕事のヒントを見つけよう
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('onboarding')}
            className="w-full py-4 rounded-2xl font-700 text-white text-base transition-all"
            style={{ background: '#6C5CE7', fontWeight: 700 }}
          >
            はじめる
          </button>
          <button
            onClick={() => navigate('companyLogin')}
            className="w-full py-4 rounded-2xl font-600 text-sm transition-all"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)', fontWeight: 600 }}
          >
            企業の方はこちら →
          </button>
        </div>

        <p className="text-xs text-white/30 mt-8">v1.0 Hackathon Edition</p>
      </div>
    </div>
  )
}
