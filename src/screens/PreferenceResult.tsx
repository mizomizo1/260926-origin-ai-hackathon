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
  const scoreItems = [primary, secondary].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#F7F8FB] px-6 py-10">
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[920px] items-center">
      <section className="w-full overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_24px_70px_rgba(31,41,55,0.10)]">
        <div className="px-8 py-7" style={{ background: 'linear-gradient(135deg, #EEF0FF 0%, #FFFFFF 72%)' }}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">Preference Result</p>
              <h1 className="mt-3 text-3xl font-bold text-gray-900">あなたの価値観の仮説</h1>
              <p className="mt-2 text-sm text-gray-500">A/Bの回答から、最初に試すTrialの方向性をまとめました。</p>
            </div>
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm sm:flex">🔮</div>
          </div>

          <div className="mt-7 rounded-3xl border border-[#D8D5FF] bg-white p-6">
            <p className="text-xs font-bold text-[#6C5CE7]">初期仮説</p>
            <p className="mt-2 text-3xl font-bold leading-tight text-gray-900">人と関わりながら伸びるタイプ</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
              相談しながら考える場面や、周囲から反応をもらえる環境で力が出やすい可能性があります。まずは小さな企画Trialで、その納得感を確かめます。
            </p>
          </div>
        </div>

        <div className="grid gap-5 px-8 py-6 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-xs font-bold text-gray-500 mb-3">回答から見えたこと</p>
            <div className="grid gap-3">
              {scoreItems.map(item => (
                <div key={item.key} className="rounded-2xl bg-[#F7F6FF] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-lg">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.shortLabel}</p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#17152B] p-5 text-white">
            <p className="text-xs font-bold text-[#A29BFE]">次に確かめること</p>
            <p className="mt-2 text-lg font-bold">チームで考えるTrialを試す</p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              相談しながら企画を考える場面で、楽しいか・力を出しやすいかを見ます。
            </p>
            <div className="mt-5 rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs font-bold text-white/70">おすすめTrial</p>
              <p className="mt-1 text-sm font-bold">小さなイベントの改善案を考える</p>
              <p className="mt-1 text-xs text-white/45">12分 · 課題発見 · 企画</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 px-8 py-6">
        <GuideRing active label="ここから始めよう" radius="9999px">
          <button onClick={() => navigate('missionDetail', { missionId: 'core_001' })} className="primary-btn">
            最初のTrialに進む(12分)
          </button>
        </GuideRing>
        <button onClick={() => navigate('studentHome')} className="w-full text-center text-xs text-gray-400 mt-4 py-2">
          あとでやる
        </button>
        </div>
      </section>
      </main>
    </div>
  )
}
