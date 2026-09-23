import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'

interface Props { navigate: (s: Screen, p?: NavParams) => void; missionId?: string }

export default function MissionDetail({ navigate, missionId }: Props) {
  const m = missions.find(x => x.id === missionId) ?? missions[0]

  return (
    <div className="flex flex-col min-h-[780px] bg-white">
      {/* Hero */}
      <div className="px-5 pt-8 pb-6 relative overflow-hidden" style={{ background: m.color + '15' }}>
        <button onClick={() => navigate('missionExplore')} className="text-gray-500 text-sm mb-4 block">← 戻る</button>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{ background: m.color + '30' }}>
            {m.emoji}
          </div>
          <div>
            <div className="flex gap-2 mb-2">
              <span className="chip text-white text-xs px-3 py-1" style={{ background: m.color }}>{m.category}</span>
              <span className="chip bg-white text-gray-600 text-xs px-3 py-1">{m.difficulty}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{m.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{m.company}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 pb-32 space-y-5">
        {/* Meta */}
        <div className="flex gap-3">
          {[
            { icon: '⏱️', label: '所要時間', value: m.duration },
            { icon: '👤', label: 'スタイル', value: m.style },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex-1 bg-gray-50 rounded-2xl p-3 text-center">
              <p className="text-lg">{icon}</p>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">Mission概要</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
        </div>

        {/* Recommended for */}
        <div className="bg-[#EEF0FF] rounded-2xl p-4">
          <h3 className="text-sm font-bold text-[#6C5CE7] mb-2">こんな人におすすめ</h3>
          {m.recommendedFor.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mt-1">
              <span className="text-[#6C5CE7]">✓</span> {r}
            </div>
          ))}
        </div>

        {/* What you gain */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">得られること</h3>
          <div className="flex flex-wrap gap-2">
            {m.gains.map(g => (
              <span key={g} className="chip bg-gray-100 text-gray-700 text-xs px-3 py-1.5">{g}</span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">進め方</h3>
          <div className="space-y-2">
            {m.steps.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                  style={{ background: m.color }}>
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {m.tags.map(t => (
            <span key={t} className="text-xs text-[#6C5CE7] bg-[#EEF0FF] px-3 py-1 rounded-full">#{t}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-5 py-4">
        <button onClick={() => navigate('missionTrial', { missionId: m.id })} className="primary-btn">
          このMissionを試す
        </button>
      </div>
    </div>
  )
}
