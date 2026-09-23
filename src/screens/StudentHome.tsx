import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions, mockStudent, passportData, scoutInvitations } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

export default function StudentHome({ navigate }: Props) {
  const featured = missions.find(m => (m as any).source === 'core') ?? missions[0]
  const currentTrial = missions[1]
  const nextTrials = missions.filter(m => m.id !== featured.id).slice(0, 3)
  const latestScout = scoutInvitations[0]

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="home" navigate={navigate} />

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          <section className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 lg:p-8">
              <p className="text-sm font-semibold text-[#6C5CE7] mb-2">あなたの現在のキャリア仮説</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight max-w-2xl">
                人と関わりながら、企画を考える仕事への関心が高いようです。
              </h1>
              <p className="text-sm text-gray-500 mt-3 max-w-2xl">
                次のJob Trialで、仮説が本当に合っているかを確かめましょう。
              </p>
            </div>
            <div className="border-t border-gray-100 bg-[#F7F6FF] p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: featured.color + '20' }}>
                  {featured.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 mb-2">
                    <span className="chip text-white" style={{ background: featured.color }}>Next Trial</span>
                    <span className="chip bg-white text-gray-600">{featured.duration}</span>
                    <span className="chip bg-white text-gray-600">{featured.difficulty}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{featured.title}</h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{featured.summary}</p>
                </div>
                <button onClick={() => navigate('missionDetail', { missionId: featured.id })}
                  className="px-5 py-3 rounded-xl bg-[#6C5CE7] text-white text-sm font-bold">
                  Trialを見る
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">Continue Current Trial</p>
              <p className="text-xs text-gray-500 mt-1">{currentTrial.title}</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-4">
                <div className="h-full w-2/5 rounded-full bg-[#6C5CE7]" />
              </div>
              <button onClick={() => navigate('missionTrial', { missionId: currentTrial.id })}
                className="mt-4 w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold">
                再開する
              </button>
            </div>

            <button onClick={() => navigate('scoutInbox')} className="w-full text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">Scout</p>
              <p className="text-xs text-gray-500 mt-1">{latestScout.companyName} · {latestScout.signal}</p>
              <span className="inline-flex mt-3 text-xs font-bold text-[#EC4899] bg-[#FDF2F8] rounded-full px-2.5 py-1">
                {scoutInvitations.length}件
              </span>
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">Career Passport</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{passportData.completedMissions}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{passportData.totalTime}</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Recently Completed Trials</h2>
              <p className="text-sm text-gray-500">体験から仮説を更新していきます</p>
            </div>
            <button onClick={() => navigate('careerPassport')} className="text-sm font-bold text-[#6C5CE7]">Passportを見る</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {passportData.experiences.slice(0, 3).map(exp => (
              <div key={exp.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-2xl mb-3">{exp.emoji}</p>
                <p className="text-sm font-bold text-gray-900">{exp.mission}</p>
                <p className="text-xs text-gray-500 mt-1">{exp.company} · {exp.date}</p>
                <p className="text-xs text-gray-600 mt-3 line-clamp-2">{exp.memo}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Next Trials</h2>
            <button onClick={() => navigate('missionExplore')} className="text-sm font-bold text-[#6C5CE7]">Explore Trials</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nextTrials.map(trial => (
              <button key={trial.id} onClick={() => navigate('missionDetail', { missionId: trial.id })}
                className="text-left bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:border-[#6C5CE7]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: trial.color + '18' }}>{trial.emoji}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{trial.title}</p>
                    <p className="text-xs text-gray-500">{trial.company}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{trial.summary}</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
