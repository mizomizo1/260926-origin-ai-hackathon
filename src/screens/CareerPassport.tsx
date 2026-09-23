import { Screen } from '../App'
import { passportData } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

export default function CareerPassport({ navigate }: Props) {
  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">佐藤 美咲さんの</p>
            <h2 className="text-xl font-bold text-gray-900">Career Passport</h2>
          </div>
          <div className="text-3xl">🗺️</div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-4">
          {[
            { label: '完了Mission', value: passportData.completedMissions, unit: '個', color: '#6C5CE7' },
            { label: '総体験時間', value: passportData.totalTime, unit: '', color: '#00B894' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="flex-1 rounded-2xl p-3 text-center" style={{ background: color + '15' }}>
              <p className="text-2xl font-bold" style={{ color }}>{value}{unit}</p>
              <p className="text-xs text-gray-600 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-5 py-4 space-y-4">
        {/* Skills */}
        <div className="bg-white rounded-3xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">スキル傾向</h3>
          <div className="space-y-3">
            {passportData.skills.map(({ label, value }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{label}</span>
                  <span className="font-mono font-semibold">{value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${value}%`, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience cards */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">体験ログ</h3>
          <div className="space-y-3">
            {passportData.experiences.map(exp => (
              <div key={exp.id} className="bg-white rounded-3xl p-4 card-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: '#EEF0FF' }}>
                    {exp.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{exp.mission}</p>
                    <p className="text-xs text-gray-500">{exp.company} · {exp.date}</p>
                    <div className="flex gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">満足度</span>
                        <span className="text-xs font-bold text-[#F59E0B]">⭐ {exp.satisfaction}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">継続意欲</span>
                        <span className="text-xs font-bold text-[#6C5CE7]">🔥 {exp.willingness}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {exp.memo && (
                  <div className="mt-3 bg-[#F7F6FF] rounded-xl p-3">
                    <p className="text-xs text-gray-600 italic">"{exp.memo}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav current="passport" navigate={navigate} />
    </div>
  )
}
