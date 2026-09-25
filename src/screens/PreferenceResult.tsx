import { Screen } from '../App'
import type { NavParams } from '../App'
import { abQuestions, preferenceLabels } from '../data/mock'
import GuideRing from '../components/GuideRing'
import { AppIcon, DataIcon } from '../components/AppIcon'

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
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1120px] items-center">
        <div className="w-full">
          <section className="mb-6 border-b border-gray-200 pb-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">Preference Result</p>
                <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900">あなたの価値観の仮説</h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">A/Bの回答から、最初に試すTrialの方向性をまとめました。</p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#6C5CE7] shadow-sm">
                <AppIcon name="sparkle" className="h-6 w-6" />
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-[#17152B] p-7 text-white lg:p-8">
              <p className="text-xs font-bold text-[#A29BFE]">初期仮説</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight lg:text-4xl">人と関わりながら伸びるタイプ</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
                相談しながら考える場面や、周囲から反応をもらえる環境で力が出やすい可能性があります。まずは小さな企画Trialで、その納得感を確かめます。
              </p>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="mb-4 text-xs font-bold text-gray-500">回答から見えたこと</p>
              <div className="grid gap-3">
                {scoreItems.map(item => (
                  <div key={item.key} className="rounded-2xl bg-[#F7F8FB] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6C5CE7]">
                        <DataIcon value={item.icon} className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.shortLabel}</p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold text-[#6C5CE7]">次に確かめること</p>
              <h2 className="mt-2 text-xl font-bold text-gray-900">チームで考えるTrialを試す</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                相談しながら企画を考える場面で、楽しいか・力を出しやすいかを見ます。
              </p>
              <div className="mt-5">
                <div className="rounded-2xl bg-[#F7F8FB] px-5 py-4">
                  <p className="text-xs font-bold text-gray-500">おすすめTrial</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">小さなイベントの改善案を考える</p>
                  <p className="mt-1 text-xs text-gray-400">12分 · 課題発見 · 企画</p>
                </div>
                <div className="mt-4">
                  <GuideRing active label="ここから始めよう" radius="9999px">
                    <button onClick={() => navigate('missionDetail', { missionId: 'core_001' })} className="primary-btn">
                      最初のTrialに進む(12分)
                    </button>
                  </GuideRing>
                  <button onClick={() => navigate('studentHome')} className="mt-3 w-full py-2 text-center text-xs text-gray-400">
                    あとでやる
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
