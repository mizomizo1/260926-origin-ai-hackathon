import { Screen } from '../App'
import { abQuestions, preferenceLabels } from '../data/mock'

interface Props { navigate: (s: Screen) => void; answers: ('a' | 'b')[] }

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
    <div className="flex flex-col min-h-[780px] bg-white pb-6">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 text-center" style={{ background: 'linear-gradient(180deg, #EEF0FF 0%, white 100%)' }}>
        <div className="text-3xl mb-2">🔮</div>
        <h2 className="text-xl font-bold text-gray-900">あなたの価値観の仮説</h2>
        <p className="text-xs text-gray-500 mt-1">最初のTrial選びに使います</p>
      </div>

      <div className="px-6">
        {/* Insight */}
        <div className="rounded-[28px] p-5 mb-4 border-l-4 border-[#6C5CE7]" style={{ background: 'linear-gradient(135deg, #EEF0FF, #F7F6FF)' }}>
          <p className="text-xs font-bold text-[#6C5CE7] mb-2">初期仮説</p>
          <p className="text-xl font-bold text-gray-900 leading-tight">人と関わりながら伸びるタイプ</p>
          <p className="text-sm text-gray-600 leading-relaxed mt-3">まずは、相談しながら考えるTrialから試してみましょう。</p>
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

        <button onClick={() => navigate('studentHome')} className="primary-btn">
          おすすめの仕事を試す
        </button>
        <button onClick={() => navigate('studentHome')} className="ghost-btn mt-3">
          後で見る
        </button>
      </div>
    </div>
  )
}
