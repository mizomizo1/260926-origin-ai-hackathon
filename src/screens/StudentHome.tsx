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
        <section className="relative overflow-hidden rounded-3xl bg-[#17152B] text-white p-7 lg:p-10 mb-6">
          <div className="relative z-10 max-w-2xl">
              <p className="text-sm font-semibold text-[#6C5CE7] mb-2">あなたの現在のキャリア仮説</p>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                人と関わりながら、企画を考える仕事への関心が高いようです。
              </h1>
              <p className="text-sm text-white/55 mt-4 max-w-xl leading-relaxed">
                次のJob Trialで、仮説が本当に合っているかを確かめましょう。
              </p>
              <button onClick={() => navigate('missionDetail', { missionId: featured.id })} className="mt-7 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#17152B]">{featured.duration}で次のTrialを試す →</button>
          </div>
          <div className="absolute right-8 bottom-[-32px] text-[190px] opacity-15">{featured.emoji}</div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: '完了したTrial', value: passportData.completedMissions, suffix: '個', color: '#6C5CE7' },
            { label: '体験時間', value: passportData.totalTime, suffix: '', color: '#00B894' },
            { label: '届いたスカウト', value: scoutInvitations.length, suffix: '件', color: '#EC4899' },
            { label: '今週の進捗(あと1つで達成)', value: '2/3', suffix: '', color: '#F59E0B' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}{item.suffix}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          <section className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div><p className="text-xs font-bold text-[#6C5CE7]">続きから再開</p><h2 className="text-xl font-bold text-gray-900 mt-1">{currentTrial.title}</h2></div>
              <span className="text-2xl">{currentTrial.emoji}</span>
            </div>
            <div className="p-6 bg-[#F7F6FF]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: featured.color + '20' }}>
                  {currentTrial.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600">{currentTrial.company} · {currentTrial.duration}</p>
                  <div className="h-2 bg-white rounded-full overflow-hidden mt-3"><div className="h-full w-2/5 rounded-full bg-[#6C5CE7]" /></div>
                </div>
                <button onClick={() => navigate('missionTrial', { missionId: currentTrial.id })} className="px-4 py-2.5 rounded-xl bg-[#6C5CE7] text-white text-sm font-bold">続きから再開</button>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            {/* 重複のため非表示: 「続きから再開」カードと同内容
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">進行中のTrial</p>
              <p className="text-xs text-gray-500 mt-1">{currentTrial.title}</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-4">
                <div className="h-full w-2/5 rounded-full bg-[#6C5CE7]" />
              </div>
              <button onClick={() => navigate('missionTrial', { missionId: currentTrial.id })}
                className="mt-4 w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold">
                再開する
              </button>
            </div>
            */}

            <button onClick={() => navigate('scoutInbox')} className="w-full text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">スカウト</p>
              <p className="text-xs text-gray-500 mt-1">{latestScout.companyName} · {latestScout.signal}</p>
              <span className="inline-flex mt-3 text-xs font-bold text-[#EC4899] bg-[#FDF2F8] rounded-full px-2.5 py-1">
                {scoutInvitations.length}件
              </span>
            </button>

            {/* 重複のため非表示: 上部の数値タイルと同内容
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">キャリアパスポート</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{passportData.completedMissions}</p>
                  <p className="text-xs text-gray-500">完了</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{passportData.totalTime}</p>
                  <p className="text-xs text-gray-500">体験時間</p>
                </div>
              </div>
            </div>
            */}
          </aside>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">次のTrial</h2>
            <button onClick={() => navigate('missionExplore')} className="text-sm font-bold text-[#6C5CE7]">Trialを探す</button>
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

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">最近終えたTrial</h2>
              <p className="text-sm text-gray-500">体験から仮説を更新していきます</p>
            </div>
            <button onClick={() => navigate('careerPassport')} className="text-sm font-bold text-[#6C5CE7]">キャリアパスポートを見る</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {passportData.experiences.slice(0, 3).map(exp => (
              <div key={exp.id} className="snap-start shrink-0 w-[300px] bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-2xl mb-3">{exp.emoji}</p>
                <p className="text-sm font-bold text-gray-900">{exp.mission}</p>
                <p className="text-xs text-gray-500 mt-1">{exp.company} · {exp.date}</p>
                <p className="text-xs text-gray-600 mt-3 line-clamp-2">{exp.memo}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
