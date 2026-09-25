import { useState } from 'react'
import { Screen } from '../App'
import { DataIcon } from '../components/AppIcon'

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
    desc: '試した仕事や感じたことはキャリアパスポートに残り、次の選択に活かせます。',
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
    <div className="min-h-screen" style={{ background: slide.bg, transition: 'background 0.4s' }}>
      <header className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
        <button onClick={() => navigate('splash')} className="flex items-center gap-3 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6C5CE7] text-sm font-bold text-white">CC</span>
          <span className="text-sm font-bold text-gray-900">Career Compass Trial</span>
        </button>
        <button onClick={() => navigate('roleSelect')} className="text-sm font-bold" style={{ color: slide.color }}>
          スキップ
        </button>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1180px] grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: slide.color }}>Onboarding</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 lg:text-6xl" style={{ whiteSpace: 'pre-line' }}>
            {slide.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
            {slide.desc}
          </p>
          <div className="mt-10 flex max-w-md items-center gap-3">
            <button onClick={next} className="rounded-2xl px-8 py-4 text-sm font-bold text-white shadow-sm" style={{ background: slide.color }}>
              {current < slides.length - 1 ? '次へ' : 'はじめる'}
            </button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`${i + 1}枚目`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 9, height: 9,
                    background: i === current ? slide.color : '#D1D5DB',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/70 bg-white/75 p-8 shadow-[0_24px_70px_rgba(31,41,55,0.12)] backdrop-blur">
          <div className="grid gap-5">
            <div className="flex min-h-[280px] items-center justify-center rounded-[28px]" style={{ background: slide.color }}>
              <DataIcon value={slide.emoji} className="h-32 w-32 text-white drop-shadow-sm" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setCurrent(index)}
                  className={`rounded-2xl border p-4 text-left transition-all ${index === current ? 'border-transparent bg-white shadow-sm' : 'border-white/70 bg-white/45'}`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: item.bg, color: item.color }}>
                    <DataIcon value={item.emoji} className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-xs font-bold leading-relaxed text-gray-700">{item.title.replace('\n', '')}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
