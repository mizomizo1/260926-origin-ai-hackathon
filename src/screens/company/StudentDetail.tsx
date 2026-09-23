import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyStudents, preferenceLabels, passportData } from '../../data/mock'

interface Props { navigate: (s: Screen) => void; studentId?: string }

export default function StudentDetail({ navigate, studentId }: Props) {
  const s = companyStudents.find(x => x.id === studentId) ?? companyStudents[0]

  return (
    <div className="flex min-h-screen">
      <CompanySidebar current="studentList" navigate={navigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <button onClick={() => navigate('studentList')} className="text-gray-400 text-sm mb-4 block">← 学生一覧</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Profile */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#6C5CE7] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-3">
                {s.name[0]}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{s.name}</h2>
              <p className="text-sm text-gray-500">{s.schoolYear}</p>
              <div className="mt-3">
                <span className="chip text-sm px-3 py-1"
                  style={s.status === 'スカウト候補' ? { background: '#EEF0FF', color: '#6C5CE7' } : { background: '#F3F4F6', color: '#6B7280' }}>
                  {s.status}
                </span>
              </div>
              <div className="flex gap-2 justify-center mt-3 flex-wrap">
                {s.fitTags.map(t => (
                  <span key={t} className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{t}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">スコア</h3>
              <div className="space-y-2">
                {[
                  { label: 'Mission完了', value: `${s.missionCompleted}個` },
                  { label: '興味度', value: s.interestLevel },
                  { label: '平均満足度', value: `${s.satisfaction}⭐` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scout CTA */}
            <button className="w-full py-3.5 rounded-2xl text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', boxShadow: '0 8px 20px rgba(108,92,231,0.3)' }}>
              ⭐ スカウト候補に追加
            </button>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Value profile */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">価値観プロフィール</h3>
              <div className="space-y-3">
                {preferenceLabels.map(({ key, label, icon }) => {
                  const val = (s.preferenceScores as any)[key]
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{icon} {label}</span>
                        <span className="font-mono text-gray-500">{val}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${val}%`, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mission history */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">完了Mission</h3>
              <div className="space-y-3">
                {passportData.experiences.slice(0, s.missionCompleted).map(exp => (
                  <div key={exp.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{exp.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{exp.mission}</p>
                        <p className="text-xs text-gray-500">{exp.company} · {exp.date}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs text-[#F59E0B]">満足度 {exp.satisfaction}</span>
                          <span className="text-xs text-[#6C5CE7]">継続意欲 {exp.willingness}</span>
                        </div>
                        {exp.memo && (
                          <p className="text-xs text-gray-500 italic mt-2">"{exp.memo}"</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
