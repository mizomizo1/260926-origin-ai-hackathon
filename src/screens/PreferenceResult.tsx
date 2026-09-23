import { Screen } from '../App'
import { abQuestions, preferenceLabels } from '../data/mock'

interface Props { navigate: (s: Screen) => void; answers: ('a' | 'b')[] }

function RadarChart({ scores }: { scores: Record<string, number> }) {
  const cx = 100, cy = 100, r = 75
  const keys = Object.keys(scores)
  const n = keys.length
  const points = keys.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2
    const val = scores[keys[i]] / 100
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) }
  })
  const gridPoints = (scale: number) => keys.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2
    return `${cx + r * scale * Math.cos(angle)},${cy + r * scale * Math.sin(angle)}`
  }).join(' ')
  const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
      {[0.25, 0.5, 0.75, 1].map(s => (
        <polygon key={s} points={gridPoints(s)} fill="none" stroke="#E8E6F5" strokeWidth="1" />
      ))}
      {keys.map((_, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)}
            stroke="#E8E6F5" strokeWidth="1"
          />
        )
      })}
      <polygon points={polyPoints} fill="rgba(108,92,231,0.15)" stroke="#6C5CE7" strokeWidth="2" />
      {keys.map((k, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2
        const label = preferenceLabels.find(l => l.key === k)
        const lx = cx + (r + 16) * Math.cos(angle)
        const ly = cy + (r + 16) * Math.sin(angle)
        return (
          <text key={k} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fill="#6B7280" fontFamily="Outfit">
            {label?.label.split('・')[0] ?? k}
          </text>
        )
      })}
    </svg>
  )
}

export default function PreferenceResult({ navigate, answers }: Props) {
  // Compute scores from answers
  const baseScores: Record<string, number> = { money_security: 50, work_life: 50, people_culture: 50, growth: 50, autonomy: 50, meaning: 50 }
  answers.forEach((ans, i) => {
    const q = abQuestions[i]
    if (!q) return
    const scoreMap = q.scores[ans]
    Object.entries(scoreMap).forEach(([k, v]) => { baseScores[k] = Math.min(100, (baseScores[k] ?? 50) + v * 7) })
  })

  const top2 = preferenceLabels.sort((a, b) => (baseScores[b.key] ?? 0) - (baseScores[a.key] ?? 0)).slice(0, 2)

  return (
    <div className="flex flex-col min-h-[780px] bg-white pb-6">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 text-center" style={{ background: 'linear-gradient(180deg, #EEF0FF 0%, white 100%)' }}>
        <div className="text-3xl mb-2">🔮</div>
        <h2 className="text-xl font-bold text-gray-900">あなたの価値観の仮説</h2>
        <p className="text-xs text-gray-500 mt-1">5問の回答から分析しました</p>
      </div>

      <div className="px-6">
        {/* Radar */}
        <div className="bg-[#F7F6FF] rounded-3xl p-4 mb-4">
          <RadarChart scores={baseScores} />
        </div>

        {/* Insight */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, #EEF0FF, #F7F6FF)' }}>
          <p className="text-sm font-medium text-[#6C5CE7] mb-1">現時点の傾向</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            あなたは今のところ
            <strong>「{top2[0]?.label}」</strong>と
            <strong>「{top2[1]?.label}」</strong>
            を重視する傾向があります。
          </p>
        </div>

        {/* Bars */}
        <div className="space-y-3 mb-6">
          {preferenceLabels.map(({ key, label, icon }) => {
            const val = baseScores[key] ?? 50
            return (
              <div key={key}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{icon} {label}</span>
                  <span className="font-mono font-medium">{val}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${val}%`, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
                </div>
              </div>
            )
          })}
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
