import { Screen } from '../App'
import { passportData } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen) => void }

export default function CareerPassport({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="passport" navigate={navigate} />
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-sm font-semibold text-[#6C5CE7]">あなたの進捗</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">キャリアパスポート</h1>
            <p className="text-sm text-gray-500 mt-2">体験を重ねるほど、あなたのキャリア仮説が具体的になります。</p>
          </div>
          <div className="hidden sm:block text-4xl">🗺️</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg">
          {[
            { label: '完了Trial', value: passportData.completedMissions, unit: '個', color: '#6C5CE7' },
            { label: '総体験時間', value: passportData.totalTime, unit: '', color: '#00B894' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="rounded-2xl p-5" style={{ background: color + '15' }}>
              <p className="text-3xl font-bold" style={{ color }}>{value}{unit}</p>
              <p className="text-xs text-gray-600 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        {/* Skills */}
        <div className="bg-[#17152B] rounded-3xl p-6 shadow-sm h-fit text-white">
          <p className="text-xs font-bold text-[#A29BFE]">あなたの傾向</p>
          <h3 className="text-xl font-bold mt-2 mb-6">スキル傾向</h3>
          <div className="space-y-3">
            {passportData.skills.map(({ label, value }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>{label}</span>
                  <span className="font-mono font-semibold">{value}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${value}%`, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience cards */}
        <div>
          <div className="flex items-end justify-between mb-4"><div><p className="text-xs font-bold text-[#6C5CE7]">これまでの歩み</p><h3 className="text-xl font-bold text-gray-900 mt-1">体験ログ</h3></div><span className="text-xs text-gray-400">3 experiences</span></div>
          <div className="space-y-4 border-l-2 border-[#EEF0FF] pl-5">
            {passportData.experiences.map(exp => (
              <div key={exp.id} className="relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <span className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-[#6C5CE7] ring-4 ring-[#F7F8FB]" />
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
      </main>
      </div>
  )
}
