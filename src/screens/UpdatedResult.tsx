import { Screen } from '../App'
import { missions, preferenceLabels, mockStudent } from '../data/mock'

interface Props { navigate: (s: Screen) => void }

const beforeScores = { money_security: 55, work_life: 65, people_culture: 75, growth: 70, autonomy: 52, meaning: 65 }
const afterScores = mockStudent.preferenceScores

export default function UpdatedResult({ navigate }: Props) {
  return (
    <div className="flex flex-col min-h-[780px] bg-white">
      {/* Header */}
      <div className="px-5 pt-10 pb-6 text-center" style={{ background: 'linear-gradient(180deg, #EEF0FF 0%, white 100%)' }}>
        <div className="w-16 h-16 rounded-full bg-[#6C5CE7] flex items-center justify-center text-3xl mx-auto mb-4"
          style={{ boxShadow: '0 8px 24px rgba(108,92,231,0.3)' }}>
          🗺️
        </div>
        <h2 className="text-xl font-bold text-gray-900">キャリア地図を更新しました！</h2>
        <p className="text-sm text-gray-500 mt-1">体験の結果を反映しました</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-5">
        {/* Before/After comparison */}
        <div className="bg-[#F7F6FF] rounded-3xl p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-4">価値観の変化</h3>
          <div className="space-y-3">
            {preferenceLabels.map(({ key, label, icon }) => {
              const before = (beforeScores as any)[key]
              const after = (afterScores as any)[key]
              const diff = after - before
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{icon} {label}</span>
                    <span className="font-mono font-medium" style={{ color: diff > 0 ? '#00B894' : diff < 0 ? '#EF4444' : '#9CA3AF' }}>
                      {diff > 0 ? `+${diff}` : diff === 0 ? '±0' : diff}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                    <div className="h-full rounded-full absolute top-0 left-0 bg-gray-300 transition-all"
                      style={{ width: `${before}%` }} />
                    <div className="h-full rounded-full absolute top-0 left-0 transition-all duration-700"
                      style={{ width: `${after}%`, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Insight */}
        <div className="rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #00B894, #00CCA3)' }}>
          <p className="text-xs text-white/80 mb-1">体験からの気づき</p>
          <p className="text-sm font-semibold text-white leading-relaxed">
            商品企画の体験を通じて、「人・雰囲気」と「やりがい」のスコアが上昇しました。チームで考える仕事があなたに合っているかもしれません。
          </p>
        </div>

        {/* Next recommended */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">次におすすめするMission</h3>
          {missions.slice(2, 3).map(m => (
            <button key={m.id} onClick={() => navigate('missionDetail')}
              className="w-full mission-card card-shadow text-left">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: m.color + '20' }}>
                  {m.emoji}
                </div>
                <div>
                  <div className="flex gap-2 mb-1">
                    <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{m.difficulty}</span>
                    <span className="chip bg-gray-100 text-gray-500">{m.duration}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">{m.title}</p>
                  <p className="text-xs text-gray-500">{m.company}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Company teaser */}
        <div className="rounded-2xl border-2 border-dashed border-[#6C5CE7]/30 p-4 text-center">
          <p className="text-sm font-semibold text-gray-700 mb-1">🏢 気になる企業が見つかりました</p>
          <p className="text-xs text-gray-500 mb-3">あなたの体験結果に関心を持っている企業があります</p>
          <button onClick={() => navigate('companyMatch')} className="text-sm text-[#6C5CE7] font-semibold">
            企業を確認する →
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-5 py-4">
        <button onClick={() => navigate('studentHome')} className="primary-btn">
          ホームに戻る
        </button>
      </div>
    </div>
  )
}
