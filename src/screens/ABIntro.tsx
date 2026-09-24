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
    <div className="flex flex-col min-h-[780px] bg-white px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="overflow-hidden rounded-3xl border border-[#E8E6F5] bg-[#F7F8FB] mb-6">
          <img src={abIllustration} alt="" className="h-52 w-full object-cover object-center" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">5問だけ、直感で選ぶ</h2>
        <p className="text-sm text-gray-500 leading-relaxed mt-3">
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
      </div>

      <div className="pb-4">
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
      </div>
    </div>
  )
}
