import { Screen } from '../App'
import type { NavParams } from '../App'
import { abQuestions, preferenceLabels } from '../data/mock'
import GuideRing from '../components/GuideRing'

interface Props { navigate: (s: Screen, p?: NavParams) => void; answers: ('a' | 'b')[] }

export default function PreferenceResult({ navigate, answers }: Props) {
  // Compute scores from answers
  const baseScores: Record<string, number> = { money_security: 50, work_life: 50, people_culture: 50, growth: 50, autonomy: 50, meaning: 50 }
  answers.forEach((ans, i) => {
    const q = abQuestions[i]
    if (!q) return
    const scoreMap = q.scores[ans]
    Object.entries(scoreMap).forEach(([k, v]) => { baseScores[k] = Math.min(100, (baseScores[k] ?? 50) + v * 7) })
  })

  const top2 = [...preferenceLabels].sort((a, b) => (baseScores[b.key] ?? 0) - (baseScores[a.key] ?? 0)).slice(0, 2)
  const primary = top2[0]
  const secondary = top2[1]

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1120px] grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      {/* Header */}
      <section className="rounded-3xl p-8" style={{ background: 'linear-gradient(180deg, #EEF0FF 0%, white 100%)' }}>
        <div className="text-3xl mb-2">🔮</div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">Preference Result</p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">あなたの価値観の仮説</h1>
        <p className="text-base text-gray-500 mt-3">最初のTrial選びに使います</p>

        <div className="rounded-[28px] p-5 mb-4 border-l-4 border-[#6C5CE7]" style={{ background: 'linear-gradient(135deg, #EEF0FF, #F7F6FF)' }}>
          <p className="text-xs font-bold text-[#6C5CE7] mb-2">初期仮説</p>
          <p className="text-xl font-bold text-gray-900 leading-tight">人と関わりながら伸びるタイプ</p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">まずは、相談しながら考えるTrialから試してみましょう。</p>
        </div>
      </section>

      <section>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 mb-4 shadow-sm">
          <p className="text-[11px] font-bold text-gray-500 mb-3">あと2ステップで、企業から反応が届きます</p>
          <div className="flex items-center gap-2">
            {[
              { label: '価値観を選ぶ', state: 'done' },
              { label: '最初のTrial', sub: '12分', state: 'next' },
              { label: '企業からの反応', state: 'locked' },
            ].map((step, index) => (
              <div key={step.label} className="flex items-center gap-2 flex-1 min-w-0">
                <div className={`flex-1 min-w-0 rounded-xl px-2 py-3 text-center ${step.state === 'next' ? 'bg-[#6C5CE7] text-white' : step.state === 'done' ? 'bg-[#EEF0FF] text-[#6C5CE7]' : 'bg-gray-50 text-gray-400'}`}>
                  <p className="text-[11px] font-bold truncate">{step.state === 'done' ? '✓ ' : step.state === 'locked' ? '🔒 ' : '▶ '}{step.label}</p>
                  {step.sub && <p className="text-[10px] opacity-80">{step.sub}</p>}
                </div>
                {index < 2 && <span className="text-gray-300 text-xs">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-gray-100 p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 mb-3">回答から見えたこと</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-2xl bg-[#F7F6FF] px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" />
              <p className="text-xs font-medium text-gray-700">{primary?.shortLabel}を大事にしやすい</p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-[#F7F6FF] px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" />
              <p className="text-xs font-medium text-gray-700">{secondary?.shortLabel}のある環境で力が出やすい</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#EEF0FF] px-4 py-3 mb-6">
          <p className="text-[11px] font-bold text-[#6C5CE7] mb-1">次に確かめること</p>
          <p className="text-xs text-gray-700 leading-relaxed">チームで考えるTrialを試して、納得感があるかを見る。</p>
        </div>

        <GuideRing active label="ここから始めよう" radius="9999px">
          <button onClick={() => navigate('missionDetail', { missionId: 'core_001' })} className="primary-btn">
            最初のTrialに進む(12分)
          </button>
        </GuideRing>
        <button onClick={() => navigate('studentHome')} className="w-full text-center text-xs text-gray-400 mt-4 py-2">
          あとでやる
        </button>
      </section>
      </main>
    </div>
  )
}
