import { useEffect, useRef, useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { companies, missions } from '../data/mock'
import { demoTrial, demoTrialScout } from '../data/demoTrial'
import { markDemoNotified } from '../state/demoTrial'
import StudentTopNav from '../components/StudentTopNav'
import GuideRing from '../components/GuideRing'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

// 提出後の流れ: 評価中 → 評価結果 → スカウト通知 → マッチ企業のレコメンド
// phase: 0-2 評価チェック中 / 3 評価結果 / 4 スカウト到着 / 5 マッチ到着
const timeline = [600, 1100, 1600, 2200, 5000, 7000]

export default function TrialEvaluation({ navigate }: Props) {
  const m = missions.find(x => x.id === demoTrial.missionId) ?? missions[0]
  const [phase, setPhase] = useState(-1)
  const [toast, setToast] = useState(false)
  const scoutRef = useRef<HTMLDivElement>(null)
  const matchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers = timeline.map((ms, i) => window.setTimeout(() => setPhase(i), ms))
    return () => timers.forEach(t => window.clearTimeout(t))
  }, [])

  useEffect(() => {
    // 届いた通知が画面外で見逃されないよう、自動でスクロールする
    if (phase === 5) matchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (phase !== 4) return
    scoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    markDemoNotified()
    setToast(true)
    const t = window.setTimeout(() => setToast(false), 4000)
    return () => window.clearTimeout(t)
  }, [phase])

  const evaluated = phase >= 3
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    if (!evaluated) return
    const t = window.setTimeout(() => setFilled(true), 100)
    return () => window.clearTimeout(t)
  }, [evaluated])
  const recommended = companies.slice(0, 3)
  const matchRates = [92, 89, 86]
  const reveal = (visible: boolean) =>
    `transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />

      {/* 通知(トースト) */}
      <div className={`fixed top-20 right-6 z-50 w-[320px] rounded-2xl bg-white border border-[#FBCFE8] p-4 shadow-xl ${reveal(toast)}`}>
        <p className="text-xs font-bold text-[#EC4899]">💌 新しい通知</p>
        <p className="text-sm font-bold text-gray-900 mt-1">{demoTrialScout.companyName}からスカウトが届きました</p>
      </div>

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
              <div className="mt-4 space-y-4">
                {demoTrial.scores.map(score => (
                  <div key={score.label}>
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

            {/* 通知 → レコメンド */}
            <div className="mt-8 space-y-4">
              <div ref={scoutRef} className={reveal(phase >= 4)}>
                <GuideRing active={phase === 4} label="あなたの回答に企業が反応しました">
                  <div className="rounded-2xl bg-white border-2 border-[#EC4899]/30 p-5 shadow-sm">
                    <p className="text-xs font-bold text-[#EC4899]">💌 スカウトが届きました</p>
                    <p className="text-base font-bold text-gray-900 mt-1">{demoTrialScout.companyName} · {demoTrialScout.role}</p>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{demoTrialScout.message}</p>
                    <button onClick={() => navigate('scoutInbox')} className="mt-4 w-full py-3 rounded-xl bg-[#EC4899] text-white text-sm font-bold">
                      スカウトを見る →
                    </button>
                  </div>
                </GuideRing>
              </div>

              <div ref={matchRef} className={reveal(phase >= 5)}>
                <GuideRing active={phase === 5} label="評価をもとにおすすめしています">
                  <div className="rounded-2xl bg-white border-2 border-[#6C5CE7]/30 p-5 shadow-sm">
                    <p className="text-xs font-bold text-[#6C5CE7]">🤝 あなたにマッチする企業</p>
                    <div className="mt-3 space-y-2">
                      {recommended.map((company, i) => (
                        <div key={company.id} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: company.color + '20' }}>{company.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{company.name}</p>
                            <p className="text-xs text-gray-500 truncate">{company.whyFit[0]}</p>
                          </div>
                          <span className="text-sm font-bold text-[#6C5CE7]">{matchRates[i]}%</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => navigate('companyMatch')} className="mt-4 w-full py-3 rounded-xl bg-[#6C5CE7] text-white text-sm font-bold">
                      マッチした企業を見る →
                    </button>
                  </div>
                </GuideRing>
              </div>

              <div className={`text-center ${reveal(phase >= 5)}`}>
                <button onClick={() => navigate('studentHome')} className="text-sm text-gray-400">ホームへ</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
