import { Screen } from '../App'
import { missions, mockStudent, preferenceLabels } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

export default function StudentHome({ navigate }: Props) {
  const top2 = preferenceLabels.sort((a, b) => (mockStudent.preferenceScores as any)[b.key] - (mockStudent.preferenceScores as any)[a.key]).slice(0, 2)

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">おはようございます 👋</p>
            <h2 className="text-xl font-bold text-gray-900">{mockStudent.name}</h2>
          </div>
          <button onClick={() => navigate('studentProfile')}
            className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white text-sm font-bold flex items-center justify-center">
            美
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 px-5 pt-4 space-y-4">
        {/* Today's insight */}
        <div className="rounded-3xl p-5 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -right-2 bottom-0 w-16 h-16 rounded-full bg-white/10" />
          <p className="text-xs text-white/70 mb-1 relative z-10">今日の一言</p>
          <p className="text-base font-semibold relative z-10">人と話しながら考える仕事に<br />向いているかも ✨</p>
          <div className="mt-3 flex gap-2 relative z-10">
            {top2.map(l => (
              <span key={l.key} className="text-xs bg-white/20 text-white rounded-full px-2 py-0.5">{l.label}</span>
            ))}
          </div>
        </div>

        {/* Next mission */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold text-gray-900">次に試すMission</h3>
            <button onClick={() => navigate('missionExplore')} className="text-xs text-[#6C5CE7] font-medium">全て見る</button>
          </div>
          <div className="space-y-3">
            {missions.slice(0, 2).map(m => (
              <button key={m.id} onClick={() => navigate('missionDetail')}
                className="w-full mission-card card-shadow text-left">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: m.color + '20' }}>
                    {m.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 mb-1">
                      <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{m.difficulty}</span>
                      <span className="chip bg-gray-100 text-gray-600">{m.duration}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">{m.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.company}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Value summary */}
        <div className="bg-white rounded-3xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">あなたの価値観</h3>
          <div className="space-y-2">
            {preferenceLabels.slice(0, 3).map(({ key, label, icon }) => {
              const val = (mockStudent.preferenceScores as any)[key]
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{icon} {label}</span>
                    <span className="font-mono">{val}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: '#6C5CE7' }} />
                  </div>
                </div>
              )
            })}
          </div>
          <button onClick={() => navigate('preferenceResult')} className="text-xs text-[#6C5CE7] font-medium mt-3">詳細を見る →</button>
        </div>

        {/* Passport preview */}
        <div className="bg-white rounded-3xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-900">Career Passport</h3>
            <button onClick={() => navigate('careerPassport')} className="text-xs text-[#6C5CE7] font-medium">全て見る</button>
          </div>
          <div className="flex gap-4">
            {[
              { label: '完了Mission', value: `${mockStudent.completedMissions}個`, color: '#6C5CE7' },
              { label: '得意傾向', value: '企画・チーム', color: '#00B894' },
              { label: '平均満足度', value: '4.4 ⭐', color: '#F59E0B' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex-1 text-center bg-[#F7F6FF] rounded-2xl p-3">
                <p className="text-base font-bold" style={{ color }}>{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav current="home" navigate={navigate} />
    </div>
  )
}
