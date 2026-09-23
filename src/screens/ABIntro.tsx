import { useState } from 'react'
import { Screen } from '../App'

interface Props { navigate: (s: Screen) => void }

const previewSteps = [
  { icon: 'A/B', title: '5つの選択', desc: '文章を読んで近い方をタップ' },
  { icon: '仮説', title: '価値観を見る', desc: '大切にしたい軸を可視化' },
  { icon: 'Trial', title: '仕事で確かめる', desc: 'おすすめMissionへ進む' },
]

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
      <div className="mb-7">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-2xl flex items-center justify-center mb-4">⚡</div>
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">ここからは、診断ではなく<br />仕事選びの準備です</h2>
        <p className="text-sm text-gray-500 leading-relaxed mt-3">
          基本情報はプロフィール。ここからは「どんな場面で力が出るか」を5つの選択で見つけます。
        </p>
      </div>

      <div className="bg-[#F7F6FF] rounded-3xl p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[#6C5CE7]">このあと起きること</p>
          <span className="text-xs text-gray-400">約1分</span>
        </div>
        <div className="space-y-3">
          {previewSteps.map((step, index) => (
            <button
              key={step.title}
              onMouseDown={() => setPressedIndex(index)}
              onMouseUp={() => setPressedIndex(null)}
              onMouseLeave={() => setPressedIndex(null)}
              onTouchStart={() => setPressedIndex(index)}
              onTouchEnd={() => setPressedIndex(null)}
              className={`w-full bg-white rounded-2xl p-3 text-left transition-all duration-150 ${pressedIndex === index ? 'scale-[0.98] bg-[#EEF0FF]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EEF0FF] text-[#6C5CE7] text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                </div>
                <span className="text-xs text-gray-300">{index + 1}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { label: '5問', sub: '選ぶだけ' },
          { label: '正解なし', sub: '直感でOK' },
          { label: 'すぐ反映', sub: 'Mission提案へ' },
        ].map(({ label, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
            <p className="text-xs font-bold text-gray-900">{label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <div className="rounded-3xl p-4 border-2 border-dashed border-[#6C5CE7]/20">
          <p className="text-xs font-bold text-gray-500 mb-3">先に一度タップしてみる</p>
          <div className="grid grid-cols-2 gap-3">
            {['一人で集中', 'チームで相談'].map((choice, index) => (
              <button
                key={choice}
                onClick={() => setDemoChoice(index)}
                onMouseDown={() => setPressedIndex(index + 10)}
                onMouseUp={() => setPressedIndex(null)}
                onMouseLeave={() => setPressedIndex(null)}
                onTouchStart={() => setPressedIndex(index + 10)}
                onTouchEnd={() => setPressedIndex(null)}
                className={`rounded-2xl p-3 text-sm font-bold transition-all duration-150 ${pressedIndex === index + 10 ? 'scale-95' : demoChoice === index ? 'scale-[1.02]' : ''}`}
                style={index === 0
                  ? {
                    background: demoChoice === index ? '#6C5CE7' : '#EEF0FF',
                    color: demoChoice === index ? 'white' : '#6C5CE7',
                    boxShadow: demoChoice === index ? '0 10px 24px rgba(108,92,231,0.20)' : 'none',
                  }
                  : {
                    background: demoChoice === index ? '#00B894' : '#E8FBF5',
                    color: demoChoice === index ? 'white' : '#00B894',
                    boxShadow: demoChoice === index ? '0 10px 24px rgba(0,184,148,0.18)' : 'none',
                  }
                }
              >
                <span>{choice}</span>
                {demoChoice === index && <span className="ml-1">✓</span>}
              </button>
            ))}
          </div>
          {demoChoice !== null && (
            <p className="text-xs text-[#6C5CE7] font-bold mt-3 transition-opacity duration-200">
              こんなふうに直感で選べばOKです。
            </p>
          )}
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
