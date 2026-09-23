import { useState } from 'react'
import { Screen } from '../App'

interface Props { navigate: (s: Screen) => void }

const slides = [
  {
    emoji: '🚀',
    title: '仕事を選ぶ前に、\n少し試してみよう',
    desc: 'Career Compass Trialでは、短い仕事体験を通じて、自分に合う仕事のヒントを見つけられます。',
    color: '#6C5CE7',
    bg: '#EEF0FF',
  },
  {
    emoji: '⚡',
    title: 'A/B選択で、\n自分の価値観が見えてくる',
    desc: '「どちらが気になる？」という簡単な比較から、あなたが重視するポイントを見つけます。',
    color: '#00B894',
    bg: '#E8FBF5',
  },
  {
    emoji: '🗺️',
    title: '体験結果が、\nあなたのキャリアの地図になる',
    desc: '試した仕事や感じたことはCareer Passportに残り、次の選択に活かせます。',
    color: '#F59E0B',
    bg: '#FEF3C7',
  },
]

export default function Onboarding({ navigate }: Props) {
  const [current, setCurrent] = useState(0)
  const slide = slides[current]

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
    else navigate('roleSelect')
  }

  return (
    <div className="flex flex-col min-h-[780px]" style={{ background: slide.bg, transition: 'background 0.4s' }}>
      {/* Skip */}
      <div className="flex justify-end p-6">
        <button onClick={() => navigate('roleSelect')} className="text-sm font-medium" style={{ color: slide.color }}>
          スキップ →
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-32 h-32 rounded-[40px] flex items-center justify-center text-6xl mb-8 mx-auto"
          style={{ background: slide.color, boxShadow: `0 12px 32px ${slide.color}40` }}>
          {slide.emoji}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4" style={{ whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
          {slide.desc}
        </p>
      </div>

      {/* Bottom */}
      <div className="px-6 pb-10">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8, height: 8,
                background: i === current ? slide.color : '#D1D5DB',
              }} />
          ))}
        </div>

        <button onClick={next} className="primary-btn" style={{ background: slide.color }}>
          {current < slides.length - 1 ? '次へ' : 'はじめる'}
        </button>
      </div>
    </div>
  )
}
