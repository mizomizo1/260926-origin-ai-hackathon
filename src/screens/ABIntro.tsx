import { useState } from 'react'
import { Screen } from '../App'
import abIllustration from '../assets/ab-test-comparison.png'

interface Props { navigate: (s: Screen) => void }

export default function ABIntro({ navigate }: Props) {
  const [pressedIndex, setPressedIndex] = useState<number | null>(null)
  const [demoChoice, setDemoChoice] = useState<number | null>(null)
  const [startPressed, setStartPressed] = useState(false)

  const start = () => {
    setStartPressed(true)
    window.setTimeout(() => {
      setStartPressed(false)
      navigate('abQuestion')
    }, 160)
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1120px] grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section>
        <div className="overflow-hidden rounded-3xl border border-[#E8E6F5] bg-[#F7F8FB]">
          <img src={abIllustration} alt="" className="h-[360px] w-full object-cover object-center" />
        </div>
      </section>
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">A/B Test</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 leading-tight">5問だけ、直感で選ぶ</h1>
        <p className="text-base text-gray-500 leading-8 mt-4">
          左右の選択肢を見比べて、今の自分に近い方を選んでください。正解はありません。
        </p>

        <div className="rounded-3xl bg-[#F7F6FF] p-4 mt-8 border border-[#E8E6F5]">
          <p className="text-xs font-bold text-gray-500 mb-3">例</p>
          <div className="grid grid-cols-2 gap-3">
            {['一人で集中', 'チームで相談'].map((choice, index) => (
              <button
                key={choice}
                onClick={() => setDemoChoice(index)}
                onMouseDown={() => setPressedIndex(index)}
                onMouseUp={() => setPressedIndex(null)}
                onMouseLeave={() => setPressedIndex(null)}
                onTouchStart={() => setPressedIndex(index)}
                onTouchEnd={() => setPressedIndex(null)}
                className={`rounded-2xl p-4 text-sm font-bold transition-all duration-150 ${pressedIndex === index ? 'scale-95' : demoChoice === index ? 'scale-[1.02]' : ''}`}
                style={index === 0
                  ? {
                    background: demoChoice === index ? '#6C5CE7' : 'white',
                    color: demoChoice === index ? 'white' : '#6C5CE7',
                  }
                  : {
                    background: demoChoice === index ? '#00B894' : 'white',
                    color: demoChoice === index ? 'white' : '#00B894',
                  }
                }
              >
                {choice}{demoChoice === index && <span className="ml-1">✓</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            {['5問', '正解なし', 'すぐ終わる'].map(label => (
              <span key={label} className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-gray-500">{label}</span>
            ))}
          </div>
        </div>

        <button
          onClick={start}
          onMouseDown={() => setStartPressed(true)}
          onMouseUp={() => setStartPressed(false)}
          onMouseLeave={() => setStartPressed(false)}
          onTouchStart={() => setStartPressed(true)}
          className={`primary-btn transition-transform duration-150 ${startPressed ? 'scale-[0.97]' : ''}`}
        >
          5問だけ選ぶ
        </button>
      </section>
      </main>
    </div>
  )
}
