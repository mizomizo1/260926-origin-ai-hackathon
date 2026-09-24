import { useEffect, useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import { demoTrial } from '../data/demoTrial'
import { completeDemoEvaluation } from '../state/demoTrial'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

const timeline = [600, 1100, 1600, 2200]

export default function TrialEvaluation({ navigate }: Props) {
  const m = missions.find(x => x.id === demoTrial.missionId) ?? missions[0]
  const [phase, setPhase] = useState(-1)

  useEffect(() => {
    const timers = timeline.map((ms, i) => window.setTimeout(() => setPhase(i), ms))
    return () => timers.forEach(t => window.clearTimeout(t))
  }, [])

  const evaluated = phase >= 3
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    if (!evaluated) return
    const t = window.setTimeout(() => setFilled(true), 100)
    return () => window.clearTimeout(t)
  }, [evaluated])
  const chartSize = 260
  const center = chartSize / 2
  const maxRadius = 96
  const angleFor = (index: number) => (Math.PI * 2 * index) / demoTrial.scores.length - Math.PI / 2
  const point = (index: number, radius: number) => {
    const angle = angleFor(index)
    return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`
  }
  const polygon = demoTrial.scores.map((score, index) => point(index, maxRadius * (filled ? score.value : 0) / 100)).join(' ')
  const grid = [0.25, 0.5, 0.75, 1].map(scale =>
    demoTrial.scores.map((_, index) => point(index, maxRadius * scale)).join(' ')
  )

  const backHome = () => {
    completeDemoEvaluation()
    navigate('studentHome')
  }

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />

      <main className="mx-auto max-w-[760px] px-6 py-10 pb-20">
        {/* 評価中 */}
        {!evaluated && (
          <div className="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full border-4 border-[#EEF0FF] border-t-[#6C5CE7] animate-spin mx-auto" />
            <h1 className="text-xl font-bold text-gray-900 mt-5">回答を評価しています</h1>
            <p className="text-sm text-gray-500 mt-1">「{m.title}」</p>
            <ul className="mt-6 space-y-2 max-w-xs mx-auto text-left">
              {demoTrial.checks.map((check, i) => (
                <li key={check} className={`flex items-center gap-2 text-sm ${phase >= i ? 'text-gray-800' : 'text-gray-300'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${phase >= i ? 'bg-[#6C5CE7] text-white' : 'bg-gray-100 text-gray-300'}`}>✓</span>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 評価結果 */}
        {evaluated && (
          <>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#6C5CE7] text-white text-3xl flex items-center justify-center mx-auto" style={{ boxShadow: '0 12px 32px rgba(108,92,231,0.35)' }}>✓</div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">評価が届きました</h1>
              <p className="text-sm text-gray-500 mt-1">この体験はキャリアパスポートに記録されました</p>
            </div>

            <section className="mt-8 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <p className="text-xs font-bold text-[#6C5CE7]">「{m.title}」の評価</p>
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-center">
                <div className="relative mx-auto">
                  <svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`} role="img" aria-label="評価レーダーチャート">
                    {grid.map((points, index) => (
                      <polygon key={index} points={points} fill="none" stroke="#E8E6F5" strokeWidth="1" />
                    ))}
                    {demoTrial.scores.map((score, index) => (
                      <g key={score.label}>
                        <line x1={center} y1={center} x2={point(index, maxRadius).split(',')[0]} y2={point(index, maxRadius).split(',')[1]} stroke="#EEF0FF" strokeWidth="1" />
                        <text
                          x={center + Math.cos(angleFor(index)) * 121}
                          y={center + Math.sin(angleFor(index)) * 121}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-gray-500 text-[10px] font-bold"
                        >
                          {score.label}
                        </text>
                      </g>
                    ))}
                    <polygon points={polygon} fill="rgba(108,92,231,0.2)" stroke="#6C5CE7" strokeWidth="3" strokeLinejoin="round" />
                    {demoTrial.scores.map((score, index) => {
                      const [x, y] = point(index, maxRadius * (filled ? score.value : 0) / 100).split(',').map(Number)
                      return <circle key={score.label} cx={x} cy={y} r="4" fill="#6C5CE7" />
                    })}
                  </svg>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-bold text-gray-900">82</p>
                    <p className="text-[11px] font-bold text-gray-400">総合</p>
                  </div>
                </div>
                <div className="space-y-3">
                {demoTrial.scores.map(score => (
                  <div key={score.label} className="rounded-2xl bg-gray-50 px-4 py-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-gray-800">{score.label}</span>
                      <span className="font-bold text-[#6C5CE7]">{score.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                      <div className="h-full rounded-full bg-[#6C5CE7] transition-all duration-1000" style={{ width: filled ? `${score.value}%` : '0%' }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">{score.comment}</p>
                  </div>
                ))}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-500">見えてきた強み</p>
                <div className="flex gap-2 flex-wrap mt-2">
                  {demoTrial.strengths.map(s => (
                    <span key={s} className="rounded-full bg-[#EEF0FF] px-3 py-1 text-xs font-bold text-[#6C5CE7]">{s}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-4 rounded-2xl bg-[#17152B] p-5 text-white">
              <p className="text-xs font-bold text-[#A29BFE]">キャリア仮説を更新しました</p>
              <p className="text-sm leading-relaxed mt-2">{demoTrial.hypothesis}</p>
            </section>

            <button onClick={backHome} className="mt-8 w-full rounded-2xl bg-[#6C5CE7] py-3.5 text-sm font-bold text-white shadow-sm">
              ホームに戻る
            </button>
          </>
        )}
      </main>
    </div>
  )
}
